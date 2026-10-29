# frozen_string_literal: true

# Sorts every article and guide into the card it shows (rules in _data/article_offers.yml): an article about a Pro
# feature gets that feature's Pro card, every other article gets the free download card for its platform. The result
# is page.article_card, read by _includes/article-card.html.
module ArticleOffer
  PAGES = %r{\A/(articles|guides)/[^/]+/\z}

  # data: the page's front matter. offers: _data/article_offers.yml.
  # Returns { "kind" => "pro", "feature" => rule } or { "kind" => "download" }.
  def self.pick(data, offers)
    rules = offers["pro"] || []
    override = data["article_offer"].to_s.strip
    return { "kind" => "download" } if override == "download"
    unless override.empty?
      rule = rules.find { |r| r["id"] == override }
      raise ArgumentError, "article_offer: #{override.inspect} is not a feature in _data/article_offers.yml" unless rule
      return { "kind" => "pro", "feature" => rule }
    end

    title = data["title"].to_s
    description = data["description"].to_s
    return { "kind" => "download" } if offers["download_when"] && title.match?(Regexp.new(offers["download_when"], Regexp::IGNORECASE))

    platform = data["article_platform"]
    best = nil
    rules.each do |rule|
      patterns = [rule["match_anywhere"]]
      patterns << rule["match"] if platform.nil? || rule["platforms"].nil? || rule["platforms"].include?(platform)
      patterns = patterns.compact.map { |source| Regexp.new(source, Regexp::IGNORECASE) }
      in_title = patterns.sum { |pattern| title.scan(pattern).size }
      in_description = patterns.sum { |pattern| description.scan(pattern).size }
      next unless in_title.positive? || in_description >= 2
      score = in_title * 3 + in_description
      best = [score, rule] if best.nil? || score > best[0]
    end
    best ? { "kind" => "pro", "feature" => best[1] } : { "kind" => "download" }
  end

  class Generator < Jekyll::Generator
    priority :low

    def generate(site)
      offers = site.data["article_offers"] || {}
      site.pages.each do |page|
        next unless page.url.match?(PAGES) && page.data["layout"] == "content"
        page.data["article_card"] = ArticleOffer.pick(page.data, offers)
      end
    end
  end
end

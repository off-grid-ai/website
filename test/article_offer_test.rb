# frozen_string_literal: true

# The article card: a Pro feature's article sells that feature, every other article offers the free app.
require "yaml"

module Jekyll
  class Generator
    def self.priority(*); end
  end
end
require_relative "../_plugins/article_offer"

offers = YAML.load_file(File.expand_path("../_data/article_offers.yml", __dir__))
failures = []
pick = ->(data) { ArticleOffer.pick(data, offers) }
feature = ->(data) { card = pick.(data); card["kind"] == "pro" ? card["feature"]["id"] : "download" }

{
  { "title" => "How to Get Automatic Zoom Meeting Notes on Your Mac", "article_platform" => "Mac" } => "meetings",
  { "title" => "How to Run a Private AI Meeting Notetaker", "article_platform" => "Any device" } => "meetings",
  { "title" => "How to Find Details Across Founder Meeting Notes", "article_platform" => "Any device" } => "download",
  { "title" => "How to Correct Your Saved Screen History", "article_platform" => "Any device" } => "memory",
  { "title" => "How to Store Passwords on Your Mac Without Cloud Sync", "article_platform" => "Mac" } => "vault",
  { "title" => "How to Run Local AI on Your Android Phone", "article_platform" => "Android" } => "download",
  { "title" => "Off Grid AI vs AnythingLLM: Private AI With Sync", "article_platform" => "Across devices" } => "download",
  { "title" => "How to Ask Follow-Up Questions While Local AI Is Answering" } => "download",
  { "title" => "A note", "description" => "Use Vault. Your vault stays local." } => "vault",
  { "title" => "A note", "description" => "Mentions the vault once." } => "download",
  { "title" => "How to Run Local AI on Your Mac", "article_offer" => "sync" } => "sync",
  { "title" => "How to Store Passwords", "article_offer" => "download" } => "download"
}.each do |data, want|
  got = feature.(data)
  failures << "#{data["title"].inspect} (#{data["article_platform"] || "no platform"}): #{got}, want #{want}" unless got == want
end
begin
  pick.({ "title" => "x", "article_offer" => "not-a-feature" })
  failures << "an unknown article_offer must fail the build"
rescue ArgumentError
end

offers["pro"].each do |rule|
  failures << "#{rule["id"]}: a Pro feature needs a name and a line" if rule["name"].to_s.empty? || rule["line"].to_s.empty?
end

# Built pages: the Pro card names its feature and opens checkout; the download card offers the platform's store.
site = File.expand_path("../_site", __dir__)
abort("Build the site before running this test") unless File.exist?(File.join(site, "index.html"))
read = ->(path) { File.read(File.join(site, path, "index.html")) }
pro = read.("articles/how-to-store-passwords-on-your-mac-in-2026-without-cloud-sync")
failures << "a Vault article must show the Vault Pro card" unless pro.include?("Vault is part of Off Grid AI Pro.") && pro.include?('data-analytics-offer="vault"') && pro.include?('href="/pro/#buy"')
failures << "a Pro article must not show the download card" if pro.include?("doc-download-card")
free = read.("articles/how-to-run-local-ai-on-your-android-phone-in-2026-no-cloud-no-account")
failures << "an Android article must offer Google Play" unless free.include?("doc-download-card") && free.include?("play.google.com/store/apps/details?id=ai.offgridmobile")
failures << "a free article must not show the Pro card" if free.include?("doc-pro-card")
guide = read.("guides/stable-diffusion-android")
failures << "guides must show an article card" unless guide.include?("doc-download-card") || guide.include?("doc-pro-card")

abort(failures.join("\n")) unless failures.empty?
puts "Article card assertions passed"

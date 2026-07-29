# frozen_string_literal: true

page_path = File.expand_path("../_site/index.html", __dir__)
cover_path = File.expand_path("../_site/assets/cover-democratizing-intelligence.png", __dir__)
abort("Build the site before running this test") unless File.exist?(page_path)

page = File.read(page_path)
cover_url = "https://getoffgridai.co/assets/cover-democratizing-intelligence.png"

failures = []
failures << "Missing versioned Open Graph cover" unless page.include?(%(<meta property="og:image" content="#{cover_url}">))
failures << "Missing versioned Twitter cover" unless page.include?(%(<meta name="twitter:image" content="#{cover_url}">))
failures << "Versioned cover was not built" unless File.exist?(cover_path)
failures << "Home-page cover reference changed" unless page.include?(%(<img src="/assets/cover.png"))

abort(failures.join("\n")) unless failures.empty?

puts "Social cover assertions passed"

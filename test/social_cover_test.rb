# frozen_string_literal: true

page_path = File.expand_path("../_site/index.html", __dir__)
cover_path = File.expand_path("../_site/assets/cover-personal-ai.png", __dir__)
abort("Build the site before running this test") unless File.exist?(page_path)

page = File.read(page_path)
cover_url = "https://getoffgridai.co/assets/cover-personal-ai.png"

failures = []
failures << "Missing versioned Open Graph cover" unless page.match?(%r{<meta property="og:image" content="#{Regexp.escape(cover_url)}"\s*/?>})
failures << "Missing versioned Twitter cover" unless page.match?(%r{<meta name="twitter:image" content="#{Regexp.escape(cover_url)}"\s*/?>})
failures << "Versioned cover was not built" unless File.exist?(cover_path)

abort(failures.join("\n")) unless failures.empty?

puts "Social cover assertions passed"

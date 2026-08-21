# frozen_string_literal: true

pages = {
  "home" => File.expand_path("../_site/index.html", __dir__),
  "download" => File.expand_path("../_site/download/index.html", __dir__),
  "pro" => File.expand_path("../_site/pro/index.html", __dir__),
  "mobile" => File.expand_path("../_site/mobile/index.html", __dir__),
  "mission" => File.expand_path("../_site/mission/index.html", __dir__),
  "ethos" => File.expand_path("../_site/ethos/index.html", __dir__),
  "vision" => File.expand_path("../_site/vision/index.html", __dir__),
  "recorder" => File.expand_path("../_site/mobile/recorder/index.html", __dir__)
}

missing_pages = pages.reject { |_name, path| File.exist?(path) }
abort("Build the site before running this test: #{missing_pages.values.join(', ')}") unless missing_pages.empty?

rendered = pages.transform_values { |path| File.read(path) }
failures = []

rendered.each do |name, page|
  failures << "#{name}: missing Sync live announcement" unless page.include?("Sync is live") || page.include?("Sync · Live")
  failures << "#{name}: stale July launch language remains" if page.match?(/landing through July|rolling out through July/i)
end

download = rendered.fetch("download")
required_download_content = {
  "macOS latest build" => "OffGrid-nightly.dmg",
  "Windows latest build" => "OffGrid-nightly-setup.exe",
  "mobile latest builds" => "https://github.com/off-grid-ai/OGAM/releases",
  "Sync anchor" => 'id="sync"'
}
required_download_content.each do |name, text|
  failures << "download: missing #{name}: #{text.inspect}" unless download.include?(text)
end

launch_pages = rendered.values_at("home", "download", "pro", "mobile")
failures << "Sync launch pages still describe Sync as beta" if launch_pages.any? { |page| page.match?(/sync.{0,40}beta|beta.{0,40}sync/i) }

console_path = File.expand_path("../_site/console/index.html", __dir__)
failures << "retired Console page was still built" if File.exist?(console_path)

consumer_pages = Dir[File.expand_path("../_site/**/*.html", __dir__)].map { |path| File.read(path) }.join("\n")
{
  "OGAC product name" => "OGAC",
  "Console host" => "onprem-console",
  "Console route" => 'href="/console',
  "Console product name" => "Off Grid AI Console"
}.each do |name, text|
  failures << "consumer site still contains #{name}: #{text.inspect}" if consumer_pages.include?(text)
end

abort(failures.join("\n")) unless failures.empty?

puts "Sync launch assertions passed"

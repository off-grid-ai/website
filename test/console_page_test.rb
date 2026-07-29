# frozen_string_literal: true

page_path = File.expand_path("../_site/console/index.html", __dir__)
abort("Build the site before running this test") unless File.exist?(page_path)

page = File.read(page_path)

required = {
  "current product narrative" => "A department gets its own working product.",
  "decision-queue App shape" => "DECISION QUEUE",
  "job/report App shape" => "JOB / REPORT",
  "canonical source repository" => "https://github.com/off-grid-ai/OGAC",
  "accurate license name" => "OFF GRID AI SOURCE-AVAILABLE LICENSE 1.0",
  "self-install limit" => "up to 25 users"
}

forbidden = {
  "retired product analogy" => "AWS for AI",
  "incorrect AGPL claim" => "AGPL",
  "stale source repository" => "github.com/off-grid-ai/console"
}

failures = []
required.each { |name, text| failures << "Missing #{name}: #{text.inspect}" unless page.include?(text) }
forbidden.each { |name, text| failures << "Found #{name}: #{text.inspect}" if page.include?(text) }
failures << "Expected exactly one h1, found #{page.scan(/<h1(?:\s|>)/).length}" unless page.scan(/<h1(?:\s|>)/).length == 1

abort(failures.join("\n")) unless failures.empty?

puts "Console page assertions passed"

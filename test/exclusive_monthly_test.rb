# frozen_string_literal: true

# The $4.99 monthly plan is a private recovery offer. Keep it out of every
# public Pro purchase surface until the product owner makes it public.
paths = %w[
  _config.yml
  _data/pricing.yml
  _includes/pricing-ladder.html
  pro.md
  thank-you.md
  assets/js/checkout-plan.js
  assets/js/pro-checkout.js
  assets/js/purchase-confirmation.js
]
source = paths.map { |path| File.read(File.expand_path("../#{path}", __dir__)) }.join("\n")

forbidden = {
  'public $4.99 price' => /\$4\.99/,
  'public monthly checkout button' => /data-plan=["']monthly["']/,
  'public monthly RevenueCat product' => /offgrid_pro_monthly/,
  'public monthly checkout plan' => /monthly\s*:/
}

forbidden.each do |label, pattern|
  raise "Found #{label}" if source.match?(pattern)
end

puts 'Exclusive monthly pricing assertions passed'

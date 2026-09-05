# frozen_string_literal: true

checkout_path = File.expand_path("../_site/ogap/index.html", __dir__)
success_path = File.expand_path("../_site/ogap/thank-you/index.html", __dir__)
abort("Build or serve the site before running this test") unless File.exist?(checkout_path) && File.exist?(success_path)

checkout = File.read(checkout_path)
success = File.read(success_path)
failures = []

failures << "OGAP checkout does not select its RevenueCat package" unless checkout.include?('var PACKAGE_ID = "pkgeb8bddbc1f9";')
failures << "OGAP checkout does not pass its package to RevenueCat" unless checkout.match?(/buildPurchaseUrl\(LINK, email, \{\s*packageId: PACKAGE_ID/m)
failures << "OGAP checkout no longer keeps one RevenueCat customer" unless checkout.include?("buys both lands on one RevenueCat customer")
failures << "OGAP success route has the wrong outcome" unless success.include?("Your OGAP") && success.include?("is reserved.")
failures << "OGAP success route omits the hardware follow-up" unless success.include?("confirm your phone model and shipping address")
failures << "OGAP success route starts the Pro purchase-confirmation flow" if success.include?("PurchaseConfirmation.start")

abort(failures.join("\n")) unless failures.empty?

puts "OGAP purchase journey assertions passed"

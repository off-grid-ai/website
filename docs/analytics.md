# Website analytics

Named interaction events are sent to the existing PostHog project. Existing
event names remain compatible with current reports.

## Downloads

`docs_download_click` covers App Store, Google Play, and direct Android APK/AAB
release links. It includes `platform` (`ios` or `android`), `build` (`store`,
`stable`, or `beta`), `page`, and `href`. The release tag determines the track;
a stable release can have a package filename containing `beta`.

`desktop_download_click` keeps its platform and build fields. Both download
events use the existing capture helper, which catches SDK failures. A click
records download intent, not a completed download or installation.

## Browser checkout returns

`pro_purchase_completed` now requires a non-empty checkout-return
`app_user_id`, a recognized Pro plan, and a positive configured price. It reuses
the existing per-tab purchase guard, so a reload or back-button return in that
tab does not create another event. Unknown-plan events and bare thank-you page
visits do not count. The Google Ads and Meta browser conversions use the same
return gate. Checkout, licensing, and redemption remain unchanged.

This event is a browser return signal, not a verified payment. The redirect
parameters and checkout cookie do not prove that a transaction settled. Its
value is the configured price, not verified revenue after discounts or tax.
Server purchase verification is outside this website change. Old events remain
in PostHog; compare events after this deployment separately from older data.

## Resource search

The same events apply to Home, Articles, Guides, Quick Start, Ethos, and
Perspectives. `source` is the page path. `placement` is `home_resources`,
`articles`, `guides`, `quick-start`, `ethos`, or `writing`. Impressions and
interactions use the same placement from the rendered search row.

| Event | Trigger |
| --- | --- |
| `resource_hub_viewed` | At least 40% of the search row enters the viewport, once per page load |
| `resource_search_used` | Search changes, after 750ms without input, or on Enter, blur, change, result click, or page exit |
| `resource_search_cleared` | An active search is removed through the search field |
| `resource_topic_selected` | A section or topic card is selected or deselected |
| `resource_device_selected` | Device filter changes |
| `resource_sort_changed` | Sort order changes |
| `resource_filters_cleared` | Clear filters is clicked, with the state before reset |
| `resource_more_clicked` | Show more is clicked, with the resulting visible count |
| `resource_result_clicked` | A result is clicked |

Interaction events include topic, device, sort, whether a search is active, query
length, word count, total results, and visible results. Result clicks also include
the destination path, result topic, result device, and its position in the visible
list. Search text and URL query parameters are excluded from these named events.
Repeated change/blur events for the same search do not create duplicate events.

## Design partner funnel

| Event | Trigger | Placement |
| --- | --- | --- |
| `design_partner_offer_viewed` | At least 40% of the offer enters the viewport, once per element per page load | `home_card`, `pro_card`, `pro_payment_form` |
| `design_partner_offer_clicked` | A link to the offer is clicked | `home_card`, `pro_card`, `pro_payment_form` |
| `design_partner_email_clicked` | The email link on the partner page is clicked | `partner_page` |

An email click measures intent to contact. It does not prove an email was sent
or a partner was accepted. A page load alone does not count as an offer view.

## Verification

Source review and `git diff --check` cover these changes. Browser interaction
checks and tests remain pending user review. The existing focused check is
`node test/site_analytics_test.js`; it has not been run for this change.
The site must remain usable when
analytics is unavailable; the capture helper must not change navigation or
checkout behavior.

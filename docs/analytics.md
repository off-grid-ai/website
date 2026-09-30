# Website analytics

Named interaction events are sent to the existing PostHog project. Page views,
download events, checkout events, and purchase events keep their existing tracking.

## Resource search

The same events apply to Home and Articles. `source` is the page path;
`placement` is `home_resources` or `articles`.

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

## Validation

Run `node test/site_analytics_test.js`. It checks both resource hubs, counts and
filters, empty results, click positions, impressions, search event deduplication,
payload privacy, and continued operation when PostHog is blocked or throws.

The site must remain usable when analytics is unavailable. The shared capture
helper catches SDK failures without changing navigation or checkout behavior.

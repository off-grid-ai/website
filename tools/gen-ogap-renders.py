#!/usr/bin/env python3
"""Generate OGAP concept/prototype renders via OpenRouter -> Gemini 3 Pro Image.

These are DESIGN CONCEPT renders for the /ogap/ pre-order page: hardware is in
design, so every frame must read as an engineering prototype / industrial-design
study, never as retail product photography of a shipping unit.

Geometry, materials and brand are locked by SPEC below and must not be
redesigned frame to frame. Dark set first, then the light-mode siblings.

Idempotent: skips frames whose file already exists. Delete a file to re-roll it.
"""
import os, json, base64, urllib.request, concurrent.futures as cf

KEY = None
for line in open("/Users/user/wednesday/cro/.env"):
    if line.startswith("LLM_API_KEY="):
        KEY = line.split("=", 1)[1].strip()

MODEL = "google/gemini-3-pro-image"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "assets", "img", "ogap")
os.makedirs(OUT, exist_ok=True)

# The Off Grid AI mark, attached to every request as a visual reference so the
# etched logo on the module is the real mark and not an invention.
LOGO_PATH = os.path.join(HERE, "..", "..", "merch", "art", "sticker-logo-dark.png")
LOGO_B64 = base64.b64encode(open(LOGO_PATH, "rb").read()).decode()

# ---------------------------------------------------------------- shared spec

FRAMING = (
    "Photorealistic studio product render, 3:2 landscape, roughly 1536x1024. "
    "Senior industrial design concept in the spirit of Teenage Engineering crossed "
    "with machined tooling: silent, exact, no decoration. "
    "65 mm equivalent lens, no wide-angle distortion, restrained depth of field. "
    "Soft large key light from upper left, one rim light picking out the machined "
    "chamfers. Physically accurate anodised metal and matte silicone. "
    "Generous empty negative space to the RIGHT of the subject for headline copy. "
)

CONCEPT = (
    "CRITICAL FRAMING: this is a DESIGN CONCEPT PROTOTYPE and must read as one - a "
    "hand-assembled, small-batch machined prototype on a studio sweep, an industrial "
    "design study, not a finished retail product. Prototype tells: raw bead-blasted "
    "anodised prototype housing, laser-etched markings instead of printed graphics, "
    "visible hex fasteners, one or two hand-deburred chamfers, faint machining witness "
    "marks. No packaging, no retail gloss, no marketing badges, no certification logos. "
)

GEOMETRY = (
    "OBJECT: OGAP - a clamp-on power and cooling module for a smartphone running local "
    "AI inference. Not a case, not a dock. GEOMETRY, fixed, do not redesign: "
    "(a) SIZE AND PLACEMENT, the most important proportion in the frame and not negotiable: "
    "a rectangular slab sitting on the LOWER HALF of the phone's back only. Its bottom edge "
    "sits a margin of about 10 percent of the phone's height up from the phone's bottom edge, "
    "and the slab's own height is about 40 percent of the phone's total height - so its top "
    "edge lands at roughly the phone's mid-point and it is noticeably SHORTER than half the "
    "phone. On a 15.8 cm tall phone the module is only about 6.5 cm tall. It is a compact "
    "block, not a full-back plate: the ENTIRE UPPER HALF of the phone's back is bare and "
    "untouched, with the camera island sitting far above the module across a wide clear gap, "
    "fully exposed and unobstructed. There is also a clear strip of bare phone back visible "
    "BELOW the module, between the module's bottom edge and the phone's bottom edge. "
    "(b) The heat spreader is nearly invisible and must stay that way: a thin dark graphite "
    "strip, no more than 8 mm wide and well under 1 mm thick, runs out from behind the "
    "module's contact face and lies absolutely flat against the phone's back, offset to one "
    "side and well clear of the camera lenses, stopping short of the camera island. Because it "
    "is barely thicker than a sticker and close in tone to the phone's back, it reads as a "
    "faint dark seam, NOT as an object. Absolutely no raised plate, no fin, no wide grey "
    "tongue, no glowing strip, no emerald line on it. The module's contact face also carries a "
    "matte dark compliant thermal pad. "
    "(c) The module is split horizontally into two equal halves, and this split never changes: "
    "the BATTERY fills the TOP HALF of the module - one clean unbroken machined panel carrying "
    "the etched logo - and the two exhaust FANS fill the BOTTOM HALF. The fans read as TWO "
    "clearly separate CIRCULAR grilles of equal size, side by side left and right, each a "
    "round milled mesh disc with a visible impeller behind it, so anyone can count two fans at "
    "a glance. Battery above, two round fans below, always. Never one single fan, never more "
    "than two, never a plain rectangular vent band in place of the two circular grilles, never "
    "fans on top, never fans in the middle. "
    "(d) Thin milled vent slots, evenly spaced, across the fan half and around the "
    "perimeter. Venting is the only ornament. "
    "(e) Thickness 13 to 16 mm, with chamfered tapered edge profile so it reads thin. "
    "(f) THE BUMPER, and this is critical: it is an EDGE-ONLY bumper - a slim soft matte-black "
    "silicone rim that runs around the phone's OUTER EDGE and corners and NOTHING ELSE. It has "
    "NO back panel whatsoever. There is no plate, no shell, no sheet and no cover across the "
    "phone's back: the phone's back is completely open and bare, and looking at the assembly from "
    "behind you see straight through the empty middle of the rim to whatever is behind it. Never "
    "draw a phone case, never draw a camera cutout in a back panel, never close the middle in. "
    "The rim itself is a thin low band gripping the four corners and running along the sides and "
    "bottom, and it is moulded with shallow recessed channels that shroud and protect the clamp "
    "arms in the side sections and capture the short wire along the bottom section, so nothing "
    "is left exposed to snag. It is deliberately universal - a plain rim with no phone-specific "
    "cutouts, so it fits any handset within its size class. Everything is snug, flush and tight: "
    "module, rim, clamp and wire read as ONE integrated object with no gaps. "
    "(g) THE CLAMP, which is easy to get wrong, so read carefully: the module is held on by "
    "two spring-loaded arms that emerge from the module's LEFT and RIGHT SIDE EDGES - from the "
    "narrow side walls of the slab, NOT from its outward-facing back panel - and reach "
    "outwards only as far as the phone's side rails, where each ends in a small soft silicone "
    "jaw that hooks around the phone's side edge and grips it, exactly like the sprung side "
    "cradle of a car phone mount. The clamp must be SLIM: the arms are thin, flat, low-profile "
    "blades a couple of millimetres thick, tucked in tight against the phone's sides and "
    "sitting BELOW the module's back surface, so looking straight at the back of the module you "
    "see only two small slim jaws peeping out at its left and right edges. No exposed coil "
    "springs, no knobs, no thumbscrews, no levers, no wide brackets, no protruding hardware of "
    "any kind - the spring mechanism is hidden inside the module. Never draw arms, pins, prongs, "
    "spikes, rods or clips standing up out of the module's back face or crossing over the front "
    "of it. Nothing crosses the phone's top edge and nothing crosses its bottom edge. The jaws "
    "sit at mid height, clear of the side buttons. "
    "(h) One emerald status LED and one recessed tactile button. No display, no numbers. "
)

# The module charges the phone one of two ways. Everything else about it is identical.
CHARGING_WIRED = (
    "CHARGING - WIRED VARIANT: the module carries TWO USB-C ports, which is the whole point "
    "of the product. An OUTPUT port on the module's bottom edge is linked to the phone's own "
    "bottom port by one very thin braided USB-C to USB-C jumper cable that simply crosses the "
    "small strip of bare phone back below the module - about 2.5 mm "
    "diameter, cord-like, and JUST ENOUGH in length and not one millimetre more - exactly the "
    "distance between the two ports, pulled taut and flat against the bottom edge so it reads "
    "almost like a short solid link bridging them. It has ZERO slack, NO hanging loop, NO "
    "dangling tail, NO drooping curve. Both ports face downward, so the cable makes ONE tight, "
    "deliberate, symmetrical U-turn between them and nothing more: a neat compact hairpin about "
    "as deep as the connector plugs are long, pressed flat and tucked up against the bottom edge "
    "of the phone like a designed strain relief. Tight and intentional, never a slack loop "
    "swinging free below the phone, never a long drooping arc, never spare length. "
    "Separately, an INPUT port is recessed into the module's side edge, left empty and "
    "unplugged, for charging the module itself from a wall charger. The user charges the "
    "module, never the phone - so the input port must be visible and obviously distinct from "
    "the short jumper. There is EXACTLY ONE cable in the frame, with exactly one plug at each "
    "of its two ends: one plug in the module's output port, one plug in the phone's port, and "
    "nothing else. Never draw two cables, never two plugs side by side in the same port, never "
    "a spare loose lead. The input port is simply an empty recessed opening with nothing in it. "
    "No magnetic charging ring and no protruding puck anywhere. "
)

CHARGING_WIRELESS = (
    "CHARGING - WIRELESS VARIANT: there is NO cable anywhere in this frame. The module "
    "charges the phone through its back by induction: its INNER CONTACT face - the hidden face pressed against the phone's back - carries a flush integrated wireless charging pad, a shallow circular coil area sitting perfectly level "
    "with the surrounding surface, marked only by a fine machined circular groove and a thin "
    "emerald hairline arc. It is completely flush - no protruding puck, no raised magnetic "
    "ring, no plastic dome, no exposed copper coil, no glowing ring. The module still carries "
    "one INPUT USB-C port recessed into its side edge, left empty and unplugged, for charging "
    "the module itself from a wall charger - the user charges the module, never the phone. The coil lives on the hidden contact face only: unless this frame explicitly shows the module rotated to reveal that face, NO coil, NO circular pad and NO ring is visible anywhere on the outward-facing back of the module - never put a charging ring or circular pad on the module's outer back face. "
)

SLEEK = (
    "OVERALL READ - this is the priority: the object must look SLEEK, slim, calm and "
    "precise, like a machined scientific instrument. One continuous milled aluminium shell "
    "with a single unbroken surface, fasteners flush and few and tiny, vent slots fine and "
    "closely pitched, chamfers crisp and generous so the slab reads noticeably thinner than "
    "it is. Thickness 13 to 16 mm. It is emphatically NOT rugged, NOT tactical, NOT "
    "armoured, NOT a gaming accessory: no chunky rails, no thick rubber armour, no bulky "
    "corner pads, no stepped plates piled on top of each other, no oversized screws. "
    "Restrained and quiet. Fewer parts, cleaner lines. "
    "THE TEST THIS DESIGN MUST PASS: it is sleek enough to leave clamped on the phone 24/7 and "
    "slide straight into a trouser pocket. So the whole assembly - module, clamp arms, jaws, "
    "corner caps and cable - is smooth, low-profile and snag-free, with every edge chamfered or "
    "rounded and nothing sticking out, hooking up or catching on fabric. It reads like part of "
    "the phone that was always there, not like an accessory bolted on. "
)

LOGO = (
    "LOGO - required, and it is the attached reference image: the Off Grid AI mark, an "
    "integrated-circuit / microchip glyph - a square chip body with a square die window cut "
    "out of its centre, three short pin legs on its left edge and three on its right edge, "
    "and a diagonal slash cutting corner to corner through the body. Reproduce that mark "
    "faithfully but SMALL and quiet: roughly 8 mm across, sitting on the battery half of "
    "the module, filled flat emerald with no gradient. Do not reproduce the reference "
    "image's black rounded-square tile or its background - only the emerald glyph itself, "
    "as a small etched and infilled mark on the metal. Do not enlarge it, do not centre it "
    "as a hero graphic, do not repeat it, do not use it as a watermark. "
)

MATERIAL_DARK = (
    "MATERIAL AND BRAND: body #0A0A0A matte bead-blasted anodised aluminium with fine "
    "microtexture; secondary surfaces #141414 and #1E1E1E. Emerald #34D399 only, and "
    "clearly visible: a continuous thin anodised groove tracing the full perimeter "
    "chamfer, the status LED, and a small "
    "emerald-filled logo mark. 'OGAP' laser-etched in small light Menlo monospace "
    "uppercase, #808080, legible not loud. Corner radii crisp - 8 mm maximum on major "
    "forms, 2 mm on details. Flat and matte throughout. Visible fasteners acceptable. "
    "Seamless neutral #2A2A2A background sweep. "
)

MATERIAL_LIGHT = (
    "MATERIAL AND BRAND, LIGHT SIBLING: body pure #FFFFFF matte bead-blasted anodised aluminium with fine microtexture - genuinely white, NOT bare silver aluminium and not grey; secondary surfaces #F4F4F4 and #E6E6E6; the fan "
    "grilles and vent slots are black. Emerald #059669 only, and clearly visible: a "
    "continuous thin anodised groove tracing the full perimeter chamfer, the status LED, and a small emerald-filled logo "
    "mark. 'OGAP' laser-etched in small light Menlo monospace uppercase, mid grey, "
    "legible not loud. Corner radii crisp - 8 mm maximum on major forms, 2 mm on "
    "details. Flat and matte throughout. Visible fasteners acceptable. Seamless clean "
    "#FFFFFF to #F2F2F2 background sweep, soft and bright. "
)

PHONE_COMMON = (
    "The phone's screen is switched off and dark - no operating system UI, no wallpaper, no "
    "status bar. The phone is context; OGAP is the subject. "
)

PHONES = {
    "none": "",
    "generic": (
        "PHONE: a completely generic unbranded modern slab - flat sides, thin uniform bezels, "
        "and a plain neutral camera island holding two simple lenses. No brand logo anywhere. "
    ) + PHONE_COMMON,

    "iphone": (
        "PHONE: an Apple iPhone 17 Pro Max, rendered accurately - a large slab with a brushed "
        "aluminium unibody back, flat sides with the machined side rails and the Action button "
        "and Camera Control on the edges, and - the defining iPhone 17 Pro Max feature, which must be rendered correctly - a single raised camera PLATEAU spanning the FULL WIDTH of the top of the back, edge to edge, like a wide shallow shelf, with the three lenses grouped at the left end of that shelf and the flash and sensor at the right end. It is NOT the older square three-lens corner bump of earlier iPhones - do not render a small square camera island. The module's top edge stops cleanly below the plateau and the whole plateau stays fully exposed and unobstructed. No Apple logo visible - the module covers the lower back where it sits. "
    ) + PHONE_COMMON,

    "nord": (
        "PHONE: a OnePlus Nord 5, rendered accurately - a large flat-sided slab with a flat "
        "display, thin even bezels, a smooth matte back, and its dual rear camera island at "
        "the TOP LEFT of the back: two circular lenses stacked vertically inside one rounded "
        "square island, with a small flash beside it. The module's top edge stops cleanly "
        "below that island and the camera island stays fully exposed and unobstructed. No "
        "brand wordmark visible - the module covers the lower back where it sits. "
    ) + PHONE_COMMON,
}

BANNED = (
    "BANNED, do not include any of these: gradients, gloss, chrome, RGB lighting, LED "
    "strips, glow bloom, carbon fibre, translucent plastic, decorative drop shadows, a "
    "second accent colour, gamer angles, pill silhouettes, watermarks, sparkle marks, "
    "text overlays, captions, labels or annotation text of any kind beyond the small etched 'OGAP' mark. In particular no serial numbers, no model codes, no part numbers, no hash marks, no regulatory text and no stray digits or characters etched anywhere on the body. The ONLY text in the whole image is the single small word OGAP. "
)

# The first frame generated becomes the canonical object; every later frame is handed
# that render as a reference so the product does not drift between images.
MASTER_FRAME = "device-01"

CONSISTENCY = (
    "PRODUCT CONSISTENCY - THIS OVERRIDES EVERYTHING ELSE. Two images are attached. The "
    "FIRST is the Off Grid logo mark. The SECOND is a photograph of the ACTUAL EXISTING OGAP "
    "PROTOTYPE, and it is the single source of truth for what this product looks like. Your "
    "job is to photograph THAT SAME PHYSICAL OBJECT again from a different angle, in different "
    "lighting, or on a different phone - not to design a new one. Copy it exactly: the same "
    "proportions and footprint, the same split of battery panel above and fan grilles below, "
    "the same two fans in the same positions, the same vent slot pitch and pattern, the same "
    "side clamp arms in the same places, the same four corner bumpers, the same chamfer and "
    "perimeter groove, the same logo at the same size in the same spot, the same OGAP etching, "
    "the same LED and button placement, the same port and cable design. If any detail is "
    "unclear in the reference, keep it as close to the reference as you can rather than "
    "inventing something. Do NOT restyle, do NOT add features, do NOT move parts around, do "
    "NOT change the grille design, do NOT change the number of fans. Same object, new "
    "photograph. "
    "SCOPE OF THE LOCK: it covers the OGAP MODULE ONLY. The PHONE in the reference is NOT "
    "locked - if this frame's text names a specific phone model, render THAT phone as "
    "described and ignore the phone in the reference photograph entirely. Camera angle, "
    "lighting, background, body colour and phone model all follow this frame's own "
    "instructions. Only the module is copied. "
)

MANUFACTURABLE = (
    "Manufacturable geometry throughout: parting lines, vent slots, hinge and spring "
    "locations all placed where a real mechanical engineer would put them. "
)

# ------------------------------------------------------------------- frames
# name -> (theme, phone, charging, shot description)
#   theme    : dark | light
#   phone    : generic | iphone | nord
#   charging : wired | wireless

FRAMES = {
    # ---- the device itself: the one frame we iterate on until it is right ----
    "device-01": ("dark", "none", "wired",
        "FRAME - THE DEVICE ITSELF, ALONE. There is NO PHONE in this image and no hand: this is "
        "the product on its own, photographed as a complete kit assembled into one object - the "
        "module, the silicone bumper cover with its integrated side and bottom rails, the slim "
        "clamp arms seated in their channels, and the short wire captured in its bottom channel. "
        "Three-quarter view from slightly above, the object resting on a seamless charcoal sweep, "
        "lit so the machined chamfers and the difference between matte aluminium and matte "
        "silicone both read clearly. It holds its own shape: the edge-only silicone rim forms a "
        "slim OPEN rectangular frame - hollow in the middle, no back panel, and you can see the "
        "charcoal sweep straight through the empty centre where a phone would sit - with the "
        "module bridging across its lower portion, exactly where it will land on a phone. This is "
        "the FIRST PHYSICAL PROTOTYPE of the product: hand-assembled from machined parts, honest "
        "and unglamorous but precise, the kind of unit an industrial designer photographs on the "
        "bench the day it comes together. Snug and integrated - tight tolerances, no gaps, "
        "nothing loose or protruding. Generous empty space to the right."),

    # ---- dark set -------------------------------------------------------
    "dark-1-hero": ("dark", "generic", "wired",
        "FRAME - HERO: three-quarter view, the module clamped onto the phone and held in a hand "
        "at eye level. The camera island is visibly clear of the module. The hand is a BARE "
        "human hand with normal healthy skin tone and natural skin texture - absolutely no "
        "glove, no latex, no gloved or waxy or pallid look. Relaxed and natural, lit softly, "
        "fingers not covering the module face. Keep the module's back face clean: only a few "
        "tiny flush fasteners, not a dense ring of screws."),

    "dark-2-back-three-quarter": ("dark", "generic", "wired",
        "FRAME - BACK THREE-QUARTER: the assembled module hovering in mid air a couple of "
        "centimetres OFF the back of the phone, clearly separated from it and clearly "
        "floating - neither part is resting on any surface, and there is no desk or table "
        "anywhere in the frame, only the seamless background sweep. No hand in frame. The module's clean top edge and the fully exposed camera island are clearly legible. A precise "
        "weightless design-review render."),

    "dark-3-side-elevation": ("dark", "generic", "wired",
        "FRAME - SIDE ELEVATION: flat-on, undistorted orthographic-feeling side view of "
        "phone plus module clamped together, so the total thickness and the tapered chamfer "
        "profile are legible. One sprung side clamp arm reads clearly in profile."),

    "dark-4-exploded": ("dark", "generic", "wired",
        "FRAME - EXPLODED: the four corner bumpers, the two sprung side clamp arms, the "
        "battery half, the fan half, the internal copper spreader plate and the short thin jumper cable separated along one axis, evenly spaced, with thin neutral leader lines "
        "between parts. Concept engineering presentation. Absolutely no text, no part "
        "numbers, no callout labels - lines only."),

    "dark-5-airflow": ("dark", "generic", "wired",
        "FRAME - AIRFLOW DIAGRAM: the assembled unit on the phone, seen straight on against "
        "a DARK charcoal #2A2A2A background - the background must stay dark, never light "
        "grey or white. Overlaid with thin emerald arrows only: intake around the perimeter "
        "vents, exhaust out through the two fan grilles, and the heat path drawn out of the phone's back through the module's contact face and down into the fans. Clean thin lines and arrowheads, no "
        "text, no numbers, no legend."),

    "dark-6-in-use": ("dark", "generic", "wired",
        "FRAME - IN USE AT NIGHT: the unit clamped on the phone, propped on a dark desk in a "
        "genuinely dark room late at night, beside the edge of a closed laptop. This frame is "
        "almost entirely near-black: no window, no daylight, no bright wall, no visible lamp, "
        "no bright reflections. The single small emerald status LED is the ONLY lit thing in "
        "the photograph, and everything else is read only through the faintest rim of light on "
        "the machined chamfers. The phone screen stays dark and switched off. Deep shadow, "
        "very low key, moody and quiet."),

    "dark-7-cutaway": ("dark", "generic", "wired",
        "FRAME - CUTAWAY / INTERNALS: the module shown as a technical cutaway concept render, "
        "its outer shell rendered as a ghosted semi-transparent dark outline so the inside is "
        "legible - the standard way an engineering team presents internals in a design review. "
        "Visible inside: two flat pouch battery cells filling the upper portion; below them "
        "the two small blower fans with their impeller blades and motor hubs; the internal copper heat spreader plate lying flat behind the module's contact face; the fine "
        "perimeter intake vents and the exhaust grilles; and the short thin jumper cable at "
        "the bottom edge plus the separate empty input port. Thin emerald airpath arrows trace "
        "the route: in at the perimeter vents, across the fans, out through the exhaust "
        "grilles. Precise, clean, restrained - not a colourful infographic. Absolutely no "
        "text, no part numbers, no callout labels, no legend anywhere."),

    "dark-8-wired-detail": ("dark", "generic", "wired",
        "FRAME - WIRED CHARGING DETAIL: a tight macro three-quarter view of the module's "
        "BOTTOM EDGE, showing how wired charging actually works. The very thin short jumper "
        "cable runs snug and taut from the module's output port into the phone's own bottom "
        "port, tucked almost flat with no slack. The separate recessed input port sits nearby, "
        "empty. Shallow depth of field, the ports and cable in sharp focus."),

    "dark-9-wireless": ("dark", "generic", "wireless",
        "FRAME - WIRELESS CHARGING VARIANT: the module rotated in mid air to face the camera "
        "with its INNER face - the face that meets the phone's back - fully visible, so the "
        "flush integrated wireless charging pad reads clearly: a shallow circular coil area "
        "perfectly level with the surrounding machined surface, marked only by a fine circular "
        "groove and a thin emerald hairline arc. The phone sits behind it, slightly out of "
        "focus. No cable anywhere in the frame."),

    "dark-10-iphone-hero": ("dark", "iphone", "wireless",
        "FRAME - HERO ON iPHONE: three-quarter view, the module clamped onto the iPhone and "
        "held in a hand at eye level. The full-width camera plateau is completely clear of the "
        "module and unobstructed. Wireless variant, so no cable in frame. Relaxed natural "
        "hand, fingers not covering the module face."),

    "dark-11-nord-hero": ("dark", "nord", "wired",
        "FRAME - ON A ONEPLUS NORD 5, FLAT LAY: this frame is NOT a hand-held hero and must not "
        "copy the reference photograph's composition. The phone lies FLAT ON ITS FACE on a dark "
        "matte surface, screen down, back upwards, rotated about 25 degrees within the frame, "
        "photographed from DIRECTLY ABOVE looking straight down. No hand anywhere. The phone is "
        "a OnePlus Nord 5 with its two stacked circular lenses in a rounded-square island at "
        "the TOP LEFT of the back - render that phone, not the phone in the reference image. "
        "The module sits clamped in place on the lower half of the back, and the camera island "
        "is far above it and completely clear. Wired variant, short taut jumper at the bottom "
        "edge."),

    # ---- light set ------------------------------------------------------
    "light-1-hero": ("light", "generic", "wired",
        "FRAME - HERO, LIGHT SIBLING: three-quarter view, the module clamped onto the phone "
        "and held in a hand, at eye level, camera island visibly clear of the module. Bright, "
        "airy, high-key studio lighting."),

    "light-2-back-three-quarter": ("light", "generic", "wireless",
        "FRAME - BACK THREE-QUARTER, LIGHT SIBLING: the assembled module hovering in mid air "
        "a couple of centimetres OFF the phone's back, clearly floating, nothing resting on "
        "any surface, no desk in frame, no hand in frame. clean top edge and exposed camera island both legible. Bright high-key studio lighting."),

    "light-3-side-elevation": ("light", "generic", "wired",
        "FRAME - SIDE ELEVATION, LIGHT SIBLING: flat-on, undistorted side view of phone plus "
        "module clamped together, thickness and tapered chamfer profile legible, one sprung "
        "side clamp arm clear in profile. Bright high-key studio lighting."),

    "light-4-exploded": ("light", "generic", "wired",
        "FRAME - EXPLODED, LIGHT SIBLING: the four corner bumpers, the two sprung side clamp "
        "arms, the battery half, the fan half, the internal copper spreader plate and the short thin jumper cable separated along one axis, evenly spaced, thin neutral leader lines "
        "between parts. No text, no part numbers, no callout labels - lines only."),

    "light-5-airflow": ("light", "generic", "wired",
        "FRAME - AIRFLOW DIAGRAM, LIGHT SIBLING: the assembled unit on the phone, seen "
        "straight on against a clean bright white background. Overlaid with thin emerald "
        "arrows only: intake around the perimeter vents, exhaust out through the two fan "
        "grilles, and the heat path drawn out of the phone's back through the module's contact face and down into the fans. Clean thin lines and arrowheads, no text, no numbers, no legend."),

    "light-6-cutaway": ("light", "generic", "wired",
        "FRAME - CUTAWAY / INTERNALS, LIGHT SIBLING. TWO OVERRIDES OF THE REFERENCE PHOTOGRAPH, "
        "both required: first, the body here is WHITE per the light material spec, so ignore the "
        "reference's dark body colour and render the shell white with black grilles; second, "
        "this is a CUTAWAY, not a normal product shot, so the outer shell MUST be drawn as a "
        "ghosted semi-transparent outline you can see through - do not render a solid closed "
        "module. Copy only the module's layout and proportions from the reference, not its "
        "colour or its solidity. Bright white sweep. "
        "Visible inside: two flat pouch battery cells filling the "
        "upper portion; below them the two small blower fans with impeller blades and motor "
        "hubs; the internal copper heat spreader plate lying flat behind the module's contact face; the fine perimeter intake vents and the exhaust grilles; and the "
        "short thin jumper cable at the bottom edge plus the separate empty input port. Thin "
        "emerald airpath arrows trace the route: in at the perimeter vents, across the fans, "
        "out through the exhaust grilles. Precise and restrained, not a colourful "
        "infographic. Absolutely no text, no part numbers, no callout labels, no legend."),

    "light-7-wireless": ("light", "generic", "wireless",
        "FRAME - WIRELESS CHARGING VARIANT, LIGHT SIBLING: the module rotated in mid air to "
        "face the camera with its INNER face fully visible, so the flush integrated wireless "
        "charging pad reads clearly: a shallow circular coil area perfectly level with the "
        "surrounding machined surface, marked only by a fine circular groove and a thin "
        "emerald hairline arc. The phone sits behind it, slightly out of focus. No cable "
        "anywhere. Bright high-key studio lighting."),

    "light-8-iphone-hero": ("light", "iphone", "wireless",
        "FRAME - HERO ON iPHONE, LIGHT SIBLING: three-quarter view, the module clamped onto "
        "the iPhone and held in a hand at eye level, its full-width camera plateau completely "
        "clear of the module. Wireless variant, no cable in frame. Bright high-key studio "
        "lighting."),

    "light-9-nord-hero": ("light", "nord", "wired",
        "FRAME - ON A ONEPLUS NORD 5, FLAT LAY, LIGHT SIBLING: this frame is NOT a hand-held "
        "hero and must not copy the reference photograph's composition. The phone lies FLAT ON "
        "ITS FACE on a clean bright white surface, screen down, back upwards, rotated about 25 "
        "degrees within the frame, photographed from DIRECTLY ABOVE looking straight down. No "
        "hand anywhere. The phone is a OnePlus Nord 5 with its two stacked circular lenses in a "
        "rounded-square island at the TOP LEFT of the back - render that phone, not the phone in "
        "the reference image. The module sits clamped on the lower half of the back, camera "
        "island far above it and completely clear. Wired variant, short taut jumper at the "
        "bottom edge. Bright high-key lighting."),
}


def prompt_for(name):
    theme, phone, charging, shot = FRAMES[name]
    material = MATERIAL_DARK if theme == "dark" else MATERIAL_LIGHT
    charge = CHARGING_WIRED if charging == "wired" else CHARGING_WIRELESS
    return (FRAMING + CONCEPT + GEOMETRY + charge + SLEEK + material + LOGO
            + PHONES[phone] + MANUFACTURABLE + shot + " " + BANNED)


def content_for(name):
    """Text prompt, the Off Grid mark, and - for every frame after the master - the
    locked master render itself, so the product stays the SAME OBJECT across the set.

    Text alone cannot hold a design identical across 20 independent generations; the
    model reinvents details each call. Passing the master back in as a reference is
    what enforces consistency.
    """
    parts = [{"type": "text", "text": prompt_for(name)}]
    master = None if name == MASTER_FRAME else existing(MASTER_FRAME)
    if master:
        parts[0]["text"] += CONSISTENCY
    parts.append({"type": "image_url",
                  "image_url": {"url": "data:image/png;base64," + LOGO_B64}})
    if master:
        ext = os.path.splitext(master)[1]
        mime = "image/jpeg" if ext == ".jpg" else "image/png"
        b64 = base64.b64encode(open(master, "rb").read()).decode()
        parts.append({"type": "image_url",
                      "image_url": {"url": f"data:{mime};base64," + b64}})
    return parts


def existing(name):
    for ext in (".png", ".jpg"):
        p = os.path.join(OUT, name + ext)
        if os.path.exists(p) and os.path.getsize(p) > 20000:
            return p
    return None


def gen(name):
    if existing(name):
        return name, "skip"
    body = json.dumps({
        "model": MODEL,
        "messages": [{"role": "user", "content": content_for(name)}],
        "modalities": ["image", "text"],
    }).encode()
    last = "no image returned"
    for _ in range(3):
        try:
            req = urllib.request.Request(
                "https://openrouter.ai/api/v1/chat/completions", data=body,
                headers={"Authorization": f"Bearer {KEY}",
                         "Content-Type": "application/json"})
            d = json.load(urllib.request.urlopen(req, timeout=300))
            imgs = d["choices"][0]["message"].get("images") or []
            if not imgs:
                last = "no image in response"
                continue
            url = imgs[0]["image_url"]["url"]
            head, b64 = url.split(",", 1)
            ext = ".jpg" if "jpeg" in head else ".png"
            dest = os.path.join(OUT, name + ext)
            open(dest, "wb").write(base64.b64decode(b64))
            return name, f"ok {os.path.getsize(dest)//1024}kb"
        except Exception as e:
            last = str(e)[:180]
    return name, f"FAIL {last}"


if __name__ == "__main__":
    import sys
    want = sys.argv[1:] or sorted(FRAMES)
    unknown = [w for w in want if w not in FRAMES]
    if unknown:
        sys.exit(f"unknown frames: {unknown}\nknown: {sorted(FRAMES)}")
    want.sort(key=lambda n: (FRAMES[n][0] != "dark", n))
    print(f"generating {len(want)} OGAP concept frames with {MODEL}")

    # The master must exist and be locked BEFORE anything else runs, because every other
    # frame is generated against it. Never generate the rest without it.
    if not existing(MASTER_FRAME):
        print(f"  master frame {MASTER_FRAME} missing - generating it first, alone")
        name, status = gen(MASTER_FRAME)
        print(f"  {status:>10}  {name}  <- MASTER")
        if not existing(MASTER_FRAME):
            sys.exit("master frame failed; refusing to generate the set without it")
        if want == [MASTER_FRAME]:
            sys.exit(0)
    else:
        print(f"  master frame locked: {os.path.basename(existing(MASTER_FRAME))}")

    rest = [n for n in want if n != MASTER_FRAME]
    with cf.ThreadPoolExecutor(max_workers=3) as ex:
        for name, status in ex.map(gen, rest):
            print(f"  {status:>10}  {name}")
    print("done ->", os.path.realpath(OUT))

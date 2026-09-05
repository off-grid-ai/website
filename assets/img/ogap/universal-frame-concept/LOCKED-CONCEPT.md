# OGAP universal-frame concept lock

These images are the current visual source of truth:

- `rear.png`
- `side.png`
- `top.png`
- `bottom.png`
- `orthographic-sheet.png`

Sharpened 2x masters and WebP derivatives live in `sharp/`.

## Website render set

The responsive page assets live in `../website/`. Each scene has paired light
and dark renders, 1200px and 2400px WebP outputs, and a JPEG fallback. The hero
also has a mobile crop.

- `hero-*`: full fitted assembly, rear three-quarter view, camera band clear
- `hero-ecosystem-*`: the assembled OGAP frame, cooling module, battery, rails,
  bumpers, and built-in connector shown without a phone
- `fit-*`: rear, side, top, and bottom views showing the adjustable frame

The main website hero uses `hero-ecosystem-*`. The wireless/wired explanation
reuses cropped views of the fitted `hero-*` image with code-native callouts.

Generation specification: photorealistic senior-industrial-design studio
visualisation of the locked geometry below; crisp machined edges and readable
Menlo wordmark; flat neutral studio background; no hands, props, labels, extra
cables, blocked controls, splitter, or loose cable loop. Dark
renders use matte black aluminium, black rubber, and emerald `#34D399`. Light
renders use pale aluminium, black grille and bumpers, and emerald `#059669`.

Do not use `website/tools/gen-ogap-renders.py` as the design source without
rewriting it. That script describes an earlier clamp/tongue concept.

## Product geometry

- The compact module sits on the middle/lower part of the phone's bare back.
  The top camera band stays completely open because camera placement varies.
- The module's visible face has the fan/thermal grille above and the battery
  body below. The Off Grid AI mark sits above the `Off Grid AI` Menlo wordmark.
- Width adjusts through concealed arms inside the module. Only the flush side
  lock blocks, cam levers, and detent teeth remain visible when fitted.
- Height adjusts along the protective edge rails and locks at the selected
  phone height.
- Each phone side uses an open C-profile: a sturdy full-height rear rail and a
  slimmer full-height front lip. The phone's metal side face and buttons remain
  exposed in the open channel between them.
- Four soft corner bumpers cap both rails. They wrap slightly onto the front
  and rear, use a compliant inner lining, and contain the whole assembly inside
  the phone silhouette.
- The battery body contains a wireless charging coil aligned to the back of the
  fitted phone.
- For wired charging, power runs through the frame to the phone's USB-C port.
  There is no external jumper or loose cable loop. A separate USB-C input
  charges OGAP.

## Visual rules

- Same physical product in every view; only the camera changes.
- Matte black anodised aluminium and soft black rubber.
- Emerald `#34D399` is the only accent.
- Sleek, pocket-safe industrial-design prototype; never rugged or gamer-styled.
- No part blocks a camera, button, speaker, or phone port.
- These are concept/prototype visuals, not evidence of final engineering,
  dimensions, capacity, ingress rating, or production readiness.

from pathlib import Path

from PIL import Image
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parent
PDF_OUTPUT = ROOT.parents[2] / "output" / "pdf" / "off-grid-ai-wednesday-story-linkedin-carousel.pdf"


def build_contact_sheet(
    paths: list[Path],
    output: Path,
    *,
    columns: int,
    thumb_width: int,
    thumb_height: int,
    gap: int = 20,
) -> None:
    rows = (len(paths) + columns - 1) // columns
    width = columns * thumb_width + (columns + 1) * gap
    height = rows * thumb_height + (rows + 1) * gap
    sheet = Image.new("RGB", (width, height), "#dfe5e2")

    for index, path in enumerate(paths):
        image = Image.open(path).convert("RGB")
        image.thumbnail((thumb_width, thumb_height), Image.Resampling.LANCZOS)
        column = index % columns
        row = index // columns
        x = gap + column * (thumb_width + gap) + (thumb_width - image.width) // 2
        y = gap + row * (thumb_height + gap) + (thumb_height - image.height) // 2
        sheet.paste(image, (x, y))

    sheet.save(output, quality=88, optimize=True)


def build_linkedin_pdf(paths: list[Path], output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    document = canvas.Canvas(str(output), pagesize=(576, 720), pageCompression=1)

    for path in paths:
        document.drawImage(
            ImageReader(str(path)),
            0,
            0,
            width=576,
            height=720,
            preserveAspectRatio=False,
            mask="auto",
        )
        document.showPage()

    document.save()


def main() -> None:
    linkedin = sorted((ROOT / "linkedin").glob("*.png"))
    x_images = sorted((ROOT / "x").glob("*.png"))

    build_contact_sheet(
        linkedin,
        ROOT / "linkedin-contact-sheet.jpg",
        columns=5,
        thumb_width=250,
        thumb_height=312,
        gap=18,
    )
    build_contact_sheet(
        x_images,
        ROOT / "x-contact-sheet.jpg",
        columns=2,
        thumb_width=480,
        thumb_height=270,
    )
    build_linkedin_pdf(linkedin, PDF_OUTPUT)


if __name__ == "__main__":
    main()

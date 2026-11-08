// QA helper: crop a region of a screenshot. node scripts/qa/crop.mjs in.png out.png top height [left width]
import sharp from 'sharp';
const [i, o, top, height, left = 0, width] = process.argv.slice(2);
const meta = await sharp(i).metadata();
await sharp(i).extract({ left: +left, top: +top, width: width ? +width : meta.width - +left, height: Math.min(+height, meta.height - +top) }).toFile(o);

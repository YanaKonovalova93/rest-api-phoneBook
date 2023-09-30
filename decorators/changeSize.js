import Jimp from "jimp";

const changeSize = async (pathToImage, width, height) => {
  const image = await Jimp.read(pathToImage);

  await image.resize(Number(width), Number(height));

  await image.writeAsync(pathToImage);
};

export default changeSize;

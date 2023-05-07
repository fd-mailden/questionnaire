export default function actualityPage(mergeData) {
  const index = mergeData.findIndex((item) => item.isDone == false);
  console.log(index)
  return index;
}

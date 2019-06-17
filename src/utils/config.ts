export const getActiveLayout = (createPageConfig: Config.CreatePage) => {
  const { activeLayout, posts, sample } = createPageConfig;

  if (activeLayout === 'posts') return posts;

  return Object.assign({}, posts, sample);
}
const If = ({ cond, children }) => {
  if (cond) return children;
  return null;
};

export default If;
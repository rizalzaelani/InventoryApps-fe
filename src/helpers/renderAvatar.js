const renderAvatar = (str, color = "light-primary") => {
  const renderColor = () => {
    const backgroundColor = [
      "light-warning",
      "light-success",
      "light-primary",
      "light-info",
      "light-danger",
    ];
    try {
      return Array(backgroundColor.length)
        .fill(null)
        .map((_, i) => [Math.random(), i])
        .sort(([a], [b]) => a - b)
        .map(([, i]) => backgroundColor[i])[0];
    } catch (er) {
      return "light-primary";
    }
  };
  return (
    <Avatar
      initials
      className="me-1"
      color={color ? color : renderColor()}
      content={str || "John Doe"}
    />
  );
};
export default renderAvatar;

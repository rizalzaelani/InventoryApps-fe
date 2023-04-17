const renderInitial = (str) => {
  let ar = str.split(" ");
  if (ar.length > 1) {
    return (
      ar.shift().charAt(0).toLocaleUpperCase() +
      ar.pop().charAt(0).toLocaleUpperCase()
    );
  } else {
    return str.charAt(0).toLocaleUpperCase();
  }
};

export default renderInitial;

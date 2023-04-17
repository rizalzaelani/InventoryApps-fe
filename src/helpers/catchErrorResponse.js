import Swal from "sweetalert2";

const catchErrorResponse = (response) => {
  console.log(response);
  const resData = response?.data ?? {};
  if (typeof resData === "object") {
    const resDataError = resData.data ?? [];
    if (Array.isArray(resDataError) && resDataError.length > 0) {
      Swal.fire({
        icon: "warning",
        title: resData.message ?? "Warning",
        html: resDataError
          .map((item) => `<p key={k}>${item.errorMessage}</p>`)
          .join(" "),
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Opps! something wrong with status code " + response.status,
        text: resData.message ?? null,
      });
    }
  } else {
    Swal.fire({
      icon: "warning",
      title: "Opps! something wrong with status code " + response.status,
      text: resData?.message ?? response?.message ?? null,
    });
  }
};

export default catchErrorResponse;

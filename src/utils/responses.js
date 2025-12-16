export const success = (data = {}, status = 200) => {
  return Response.json({ success: true, data }, { status });
};

export const failure = (message = "Something went wrong", status = 500) => {
  return Response.json({ success: false, message }, { status });
};

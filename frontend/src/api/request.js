const defaultHeaders = {
  Authorization: "diogo"
};

const request = async (path, method, params = {}) => {
  try {
    const res = await fetch(path, {
      method,
      headers: {
        ...defaultHeaders
      },
      body: JSON.stringify(params.body)
    });

    const envelope = await res.json();

    return {
      status: res.status,
      envelope
    };
  } catch (e) {
    return e;
  }
};

export default request;

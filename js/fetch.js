async function sendData(server, method, formData) {
  const response = await fetch(server, {
    method: method,
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log('SEND');
  console.log(data);

  // } catch (error) {
  //   console.error('Error:', error);
}

async function loadData(server) {
  try {
    const response = await fetch(server);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

export {sendData, loadData};

export const createPrediction = async (req, res) => {
  const { message } = req.body;
  console.log(message);

  try {
    const flowiseData = {
      question: message,
    };

    // Call flowise endpoint
    const response = await fetch(`${process.env.FLOWISE_URL}/api/v1/prediction/${process.env.FLOW_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FLOWISE_API_KEY}`
      },
      body: JSON.stringify(flowiseData)
    });

    const data = await response.json();
    console.log(data);

    // Accessing the 'text' property from the data object
    const resultText = data.text;

    if (resultText) {
      res.status(200).json({ message: resultText });
    } else {
      res.status(200).json({ message: 'Text not found in the response' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

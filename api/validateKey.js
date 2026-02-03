export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { key } = req.body;

  if (!key) {
    return res.status(400).json({ valid: false, error: "No key provided" });
  }

  try {
    // Fetch your JSON from GitHub
    const response = await fetch(
      "https://raw.githubusercontent.com/erickouassi/Random-Ad-Test-Ad-Free-Mode-Activated/refs/heads/main/adFreeData.json"
    );

    if (!response.ok) {
      return res.status(500).json({ valid: false, error: "Failed to fetch key file" });
    }

    const data = await response.json();

    // Validate key
    const isValid = data.keys.some(entry => entry.key === key);

    return res.status(200).json({ valid: isValid });
  } catch (err) {
    console.error("Error validating key:", err);
    return res.status(500).json({ valid: false, error: "Server error" });
  }
}

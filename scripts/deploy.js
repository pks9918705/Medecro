const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");
  const upload = await Upload.deploy();  // Deploy the contract

  await upload.waitForDeployment();  // Instead of .deployed()

  console.log("Library deployed to:", await upload.getAddress());  // Use .getAddress()
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

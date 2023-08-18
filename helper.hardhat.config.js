const { ethers } = require("hardhat");

const initialSupply = ethers.utils.parseEther("1000");

const developmentChains = ["hardhat", "localhost"];

const feeWallet = "0x4C52da05711344e08DD5b2358b7B9b0888a456F4";

const feeConversionRate = ethers.utils.parseEther("0.1");

const buySellTaxPercentage = 2;

const additionalFeePercentage = 1;

module.exports = {
    developmentChains,
    initialSupply,
    buySellTaxPercentage,
    feeWallet,
    feeConversionRate,
    additionalFeePercentage
}
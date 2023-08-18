const { network } = require("hardhat");
const { initialSupply, feeWallet, feeConversionRate, buySellTaxPercentage, additionalFeePercentage, developmentChains } = require("../helper.hardhat.config");
const {verify} = require("../utils/verify");
module.exports = async function({getNamedAccounts, deployments}){

    const {deploy, log} = deployments;

    const {deployer} = await getNamedAccounts();

    let arguments = [initialSupply, feeWallet, feeConversionRate, buySellTaxPercentage, additionalFeePercentage];

    log("deploying.............................");

    const customToken = await deploy("CustomToken", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    });

    if(!developmentChains.includes(network.name)){
        log("verifying.........................");
        await verify(customToken.address, arguments);
    }
}

module.exports.tags = ["all", "customToken"];
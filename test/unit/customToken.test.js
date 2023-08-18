const { network, ethers, deployments } = require("hardhat");
const { developmentChains, feeWallet, buySellTaxPercentage,  feeConversionRate, additionalFeePercentage} = require("../../helper.hardhat.config");


!developmentChains.includes(network.name) ? describe.skip :

describe("CustomToken", function(){
    
    let customToken, deployer, recipient
    beforeEach(async function(){
        const accounts = await ethers.getSigners();
        deployer = accounts[0];
        recipient = accounts[1];
        await deployments.fixture(["all"]);
        customToken = await ethers.getContract("CustomToken");
        customToken.connect(deployer);
    });

    describe("Transfer", function(){
        it("it transfers the token with taxes and fees", async function(){
            const amountToTransfer = ethers.utils.parseEther("1");
            await customToken.transfer(recipient.address, amountToTransfer);

            const ownerBalanceAfter = await customToken.balanceOf(deployer.address);
            const recipientBalance = await customToken.balanceOf(recipient.address);
            const feeWalletBalance = await customToken.balanceOf(feeWallet);

            const buySellTax = (amountToTransfer.mul(buySellTaxPercentage)).div(100);
            const additionalFees = (amountToTransfer.mul(additionalFeePercentage)).div(100);
            const expectedRecipientBalance = amountToTransfer.sub(buySellTax).sub(additionalFees);
            const expectedFeeWalletBalance = buySellTax.add(additionalFees);
            
            expect(ownerBalanceAfter).to.equal(initialSupply.sub(amountToTransfer));
            expect(recipientBalance).to.equal(expectedRecipientBalance);
            expect(feeWalletBalance).to.equal(expectedFeeWalletBalance);
        });
    });
});
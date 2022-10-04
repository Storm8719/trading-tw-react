class assetRandomDataGenerator{

    constructor(assetName , lowestPrice,highestPrice, currentPrice, changePriceMaxStep) {
        this.assetName = assetName;
        this.currentPrice = currentPrice;
        this.lowestPrice = lowestPrice;
        this.highestPrice = highestPrice;
        this.changePriceMaxStep = changePriceMaxStep;
    }

    assetName = 'AUD/USD';
    currentPrice = 500;
    lowestPrice  = 1;
    highestPrice = 1000;
    changePriceMaxStep = 50;

    setAsset = (newAssetName) => {
        this.assetName = newAssetName;
    }
    getRandomData = () => {
        return {
            status:'ok',
            name: this.assetName,
            time:this.getTimestampInSeconds(),
            price: this.changeRandomPrice(),
        }
    }
    getTimestampInSeconds () {
        return Math.floor(Date.now() / 1000)
    }
    changeRandomPrice(){
        // return Math.floor(Math.random() * this.highestPrice) + this.lowestPrice;
        let newPrice = this.currentPrice;
        if(Math.floor(Math.random() * 2)){
            newPrice += Math.floor(Math.random() * this.changePriceMaxStep);
        }else{
            newPrice -= Math.floor(Math.random() * this.changePriceMaxStep);
        }

        if(newPrice >= this.highestPrice || newPrice <= this.lowestPrice){
            return this.changeRandomPrice();
        }else{
            this.currentPrice = newPrice;
            return newPrice;
        }
    }
}

export default assetRandomDataGenerator;
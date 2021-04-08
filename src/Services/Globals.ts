// Global settings which are the same for development and production: 
class Globals {
}

// Global settings which are suitable only for development:
class DevelopmentGlobals extends Globals {
    public urls = {
        products: "http://localhost:8080/api/products/",
        couponImages: "http://localhost:8080/images/",
        localUrl : "http://localhost"
    };
}

// Global settings which are suitable only for production:
class ProductionGlobals extends Globals {
    public urls = {
        products: "http://localhost:3030/api/products/", // In real life there will be the production address
        couponImages:"http://localhost:8080/images/",
        localUrl : "http://localhost"
    };
}

// Creating the correct object
const globals = process.env.NODE_ENV === "development" ? new DevelopmentGlobals() : new ProductionGlobals();

export default globals;

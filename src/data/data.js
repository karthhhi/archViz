const jsonData = [
  {
    "data": {
      "id": "eCommerce",
      "label": "eCommerce"
    }
  },
  {
    "data": {
      "id": "pages",
      "label": "Pages",
      "parent": "eCommerce"
    }
  },
  {
    "data": {
      "id": "home",
      "label": "Home",
      "parent": "pages"
    },
    "renderedPosition": {
      "x": "125.0",
      "y": "75.0"
    }
  },
  {
    "data": {
      "id": "searchResults",
      "label": "Search Results",
      "parent": "pages"
    },
    "renderedPosition": {
      "x": "280.0",
      "y": "75.0"
    }
  },
  {
    "data": {
      "id": "productDetail",
      "label": "Product Detail",
      "parent": "pages"
    },
    "renderedPosition": {
      "x": "435.0",
      "y": "75.0"
    }
  },
  {
    "data": {
      "id": "cart",
      "label": "Cart",
      "parent": "pages"
    },
    "renderedPosition": {
      "x": "590.0",
      "y": "75.0"
    }
  },
  {
    "data": {
      "id": "checkout",
      "label": "Checkout",
      "parent": "pages"
    },
    "renderedPosition": {
      "x": "745.0",
      "y": "75.0"
    }
  },
  {
    "data": {
      "id": "userProfile",
      "label": "User Profile",
      "parent": "pages"
    },
    "renderedPosition": {
      "x": "900.0",
      "y": "75.0"
    }
  },
  {
    "data": {
      "id": "orderHistory",
      "label": "Order History",
      "parent": "pages"
    },
    "renderedPosition": {
      "x": "1055.0",
      "y": "75.0"
    }
  },
  {
    "data": {
      "id": "acctCreation",
      "label": "Acct. Creation",
      "parent": "pages"
    },
    "renderedPosition": {
      "x": "1210.0",
      "y": "75.0"
    }
  },
  {
    "data": {
      "id": "presentationOrchestration",
      "label": "Presentation Orchestration",
      "parent": "eCommerce"
    }
  },
  {
    "data": {
      "id": "homeBFF",
      "label": "Home BFF",
      "parent": "presentationOrchestration"
    },
    "renderedPosition": {
      "x": "125.0",
      "y": "175.0"
    }
  },
  {
    "data": {
      "id": "searchBFF",
      "label": "Search BFF",
      "parent": "presentationOrchestration"
    },
    "renderedPosition": {
      "x": "280.0",
      "y": "175.0"
    }
  },
  {
    "data": {
      "id": "productDetailBFF",
      "label": "Product Detail BFF",
      "parent": "presentationOrchestration"
    },
    "renderedPosition": {
      "x": "435.0",
      "y": "175.0"
    }
  },
  {
    "data": {
      "id": "cartBFF",
      "label": "Cart BFF",
      "parent": "presentationOrchestration"
    },
    "renderedPosition": {
      "x": "590.0",
      "y": "175.0"
    }
  },
  {
    "data": {
      "id": "checkoutBFF",
      "label": "Checkout BFF",
      "parent": "presentationOrchestration"
    },
    "renderedPosition": {
      "x": "745.0",
      "y": "175.0"
    }
  },
  {
    "data": {
      "id": "userBFF",
      "label": "User BFF",
      "parent": "presentationOrchestration"
    },
    "renderedPosition": {
      "x": "900.0",
      "y": "175.0"
    }
  },
  {
    "data": {
      "id": "orderHistoryBFF",
      "label": "Order History BFF",
      "parent": "presentationOrchestration"
    },
    "renderedPosition": {
      "x": "1055.0",
      "y": "175.0"
    }
  },
  {
    "data": {
      "id": "acctCreationBFF",
      "label": "Acct. Creation BFF",
      "parent": "presentationOrchestration"
    },
    "renderedPosition": {
      "x": "1210.0",
      "y": "175.0"
    }
  },
  {
    "data": {
      "id": "serverLessOrch",
      "label": "Serverless Orchestration",
      "parent": "eCommerce"
    }
  },
  {
    "data": {
      "id": "headerOrch",
      "label": "Header Orch.",
      "parent": "serverLessOrch"
    },
    "renderedPosition": {
      "x": "745.0",
      "y": "275.0"
    }
  },
  {
    "data": {
      "id": "p13nOrch",
      "label": "P13n Orchestration",
      "parent": "serverLessOrch"
    },
    "renderedPosition": {
      "x": "900.0",
      "y": "275.0"
    }
  },
  {
    "data": {
      "id": "acctCreateOrch",
      "label": "Acct. Create Orch.",
      "parent": "serverLessOrch"
    },
    "renderedPosition": {
      "x": "1210.0",
      "y": "275.0"
    }
  },
  {
    "data": {
      "id": "itemOrch",
      "label": "Item",
      "parent": "eCommerce"
    },
    "renderedPosition": {
      "x": "745.0",
      "y": "375.0"
    }
  },
  {
    "data": {
      "id": "dataSvc",
      "label": "Data Services",
      "parent": "eCommerce"
    }
  },
  {
    "data": {
      "id": "dealsDS",
      "label": "Deals",
      "parent": "dataSvc"
    },
    "renderedPosition": {
      "x": "125.0",
      "y": "475.0"
    }
  },
  {
    "data": {
      "id": "searchDS",
      "label": "Search",
      "parent": "dataSvc"
    },
    "renderedPosition": {
      "x": "300.0",
      "y": "475.0"
    }
  },
  {
    "data": {
      "id": "cartDS",
      "label": "Cart / List",
      "parent": "dataSvc"
    },
    "renderedPosition": {
      "x": "455.0",
      "y": "475.0"
    }
  },
  {
    "data": {
      "id": "p13nDS",
      "label": "P13n",
      "parent": "dataSvc"
    },
    "renderedPosition": {
      "x": "610.0",
      "y": "475.0"
    }
  },
  {
    "data": {
      "id": "loyaltyDS",
      "label": "Loyalty / Program",
      "parent": "dataSvc"
    },
    "renderedPosition": {
      "x": "765.0",
      "y": "475.0"
    }
  },
  {
    "data": {
      "id": "priceDS",
      "label": "Price",
      "parent": "dataSvc"
    },
    "renderedPosition": {
      "x": "940.0",
      "y": "475.0"
    }
  },
  {
    "data": {
      "id": "productDS",
      "label": "Product",
      "parent": "dataSvc"
    },
    "renderedPosition": {
      "x": "1095.0",
      "y": "475.0"
    }
  },
  {
    "data": {
      "id": "extSvc",
      "label": "External/Legacy"
    }
  },
  {
    "data": {
      "id": "mdmSvc",
      "label": "MDM",
      "parent": "extSvc"
    },
    "renderedPosition": {
      "x": "125.0",
      "y": "580.0"
    }
  },
  {
    "data": {
      "id": "p13nSvc",
      "label": "P13n DB",
      "parent": "extSvc"
    },
    "renderedPosition": {
      "x": "610.0",
      "y": "580.0"
    },
    "classes": "db"
  },
  {
    "data": {
      "id": "loyaltySvc",
      "label": "Loyalty DB",
      "parent": "extSvc"
    },
    "renderedPosition": {
      "x": "765.0",
      "y": "580.0"
    },
    "classes": "db"
  },
  {
    "data": {
      "id": "cpiSvc",
      "label": "CP & I",
      "parent": "extSvc"
    },
    "renderedPosition": {
      "x": "1095.0",
      "y": "580.0"
    }
  },
  {
    "data": {
      "id": "home-homeBFF",
      "source": "home",
      "target": "homeBFF"
    }
  },
  {
    "data": {
      "id": "searchResults-searchBFF",
      "source": "searchResults",
      "target": "searchBFF"
    }
  },
  {
    "data": {
      "id": "productDetail-productDetailBFF",
      "source": "productDetail",
      "target": "productDetailBFF"
    }
  },
  {
    "data": {
      "id": "cart-cartBFF",
      "source": "cart",
      "target": "cartBFF"
    }
  },
  {
    "data": {
      "id": "checkout-checkoutBFF",
      "source": "checkout",
      "target": "checkoutBFF"
    }
  },
  {
    "data": {
      "id": "userProfile-userBFF",
      "source": "userProfile",
      "target": "userBFF"
    }
  },
  {
    "data": {
      "id": "orderHistory-orderHistoryBFF",
      "source": "orderHistory",
      "target": "orderHistoryBFF"
    }
  },
  {
    "data": {
      "id": "acctCreation-acctCreationBFF",
      "source": "acctCreation",
      "target": "acctCreationBFF"
    }
  },
  {
    "data": {
      "id": "acctCreationBFF-acctCreateOrch",
      "source": "acctCreationBFF",
      "target": "acctCreateOrch"
    }
  },
  {
    "data": {
      "id": "searchBFF-itemOrch",
      "source": "searchBFF",
      "target": "itemOrch"
    }
  },
  {
    "data": {
      "id": "homeBFF-itemOrch",
      "source": "homeBFF",
      "target": "itemOrch"
    }
  },
  {
    "data": {
      "id": "homeBFF-itemOrch",
      "source": "homeBFF",
      "target": "itemOrch"
    }
  },
  {
    "data": {
      "id": "itemOrch-priceDS",
      "source": "itemOrch",
      "target": "priceDS"
    }
  },
  {
    "data": {
      "id": "itemOrch-productDS",
      "source": "itemOrch",
      "target": "productDS"
    }
  },
  {
    "data": {
      "id": "homeBFF-dealsDS",
      "source": "homeBFF",
      "target": "dealsDS"
    }
  },
  {
    "data": {
      "id": "searchBFF-searchDS",
      "source": "searchBFF",
      "target": "searchDS"
    }
  },
  {
    "data": {
      "id": "productDetailBFF-productDS",
      "source": "productDetailBFF",
      "target": "productDS"
    }
  },
  {
    "data": {
      "id": "cartBFF-cartDS",
      "source": "cartBFF",
      "target": "cartDS"
    }
  },
  {
    "data": {
      "id": "mdmSvc-searchDS",
      "source": "mdmSvc",
      "target": "searchDS",
      "type": "DB"
    }
  }
]

export { jsonData }
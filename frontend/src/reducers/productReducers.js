// PRODUCT CONSTANTS (from productConstants.js)
// export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST';
// export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS';
// export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL';

// OBSOLETE REDUCER
// export const productListReducer = (state = { products: [] }, action) => {
//     switch (action.type) {
//         case PRODUCT_LIST_REQUEST:
//             return { loading: true, products: [] };
//         case PRODUCT_LIST_SUCCESS:
//             return { loading: false, products: action.payload };
//         case PRODUCT_LIST_FAIL:
//             return { loading: false, error: action.payload };
//         default:
//             return state;
//     }
// }

import { createSlice } from '@reduxjs/toolkit';

//first//////////////////////////////////
const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },
    reducers: {
        productListRequest: (state, action) => {
            state.loading = true;
            state.products = [];
        },
        productListSuccess: (state = { products: [] }, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        productListFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const productReducer = productSlice.reducer;
export const { productListRequest, productListSuccess, productListFail } = productSlice.actions;

//second/////////////////////////////////////////////////////
const productDetailsSlice = createSlice({
    name: 'products',
    initialState: {
        product: { reviews: [] }
    },
    reducers: {
        productDetailsRequest: (state, action) => {
            state.loading = true;
        },
        productDetailsSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        productDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const productDetailsReducer = productDetailsSlice.reducer;
export const { productDetailsRequest, productDetailsSuccess, productDetailsFail } = productDetailsSlice.actions;


//delete product
//again import old product from data =>   npm run data: import
const productDeleteSlice = createSlice({
    name: 'products',
    initialState: {
        
    },
    reducers: {
        productDeleteRequest: (state, action) => {
            state.loading = true;
        },
        productDeleteSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        productDeleteFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const productDeleteReducer = productDeleteSlice.reducer;
export const { productDeleteRequest, productDeleteSuccess, productDeleteFail } = productDeleteSlice.actions;


//create product
const productCreateSlice = createSlice({
    name: 'products',
    initialState: {
        
    },
    reducers: {
        productCreateRequest: (state, action) => {
            state.loading = true;
        },
        productCreateSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.product = action.payload;
        },
        productCreateFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        productCreateReset: (state, action) => {
            state.success = false;
        }
    }
});

export const productCreateReducer = productCreateSlice.reducer;
export const {
    productCreateRequest,
    productCreateSuccess,
    productCreateFail,
    productCreateReset
} = productCreateSlice.actions;



//update product
const productUpdateSlice = createSlice({
    name: 'products',
    initialState: {
        product: {}
    },
    reducers: {
        productUpdateRequest: (state, action) => {
            state.loading = true;
        },
        productUpdateSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.product = action.payload;
        },
        productUpdateFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        productUpdateReset: (state, action) => {
            state.product = {};
        }
    }
});

export const productUpdateReducer = productUpdateSlice.reducer;
export const {
    productUpdateRequest,
    productUpdateSuccess,
    productUpdateFail,
    productUpdateReset
} = productUpdateSlice.actions;

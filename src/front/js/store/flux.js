const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      data: null,
      message: null,
      types: ["Select a type", "Organic", "Plastic", "Textile", "Metallic"],
      units: ["Select an unit", "kg", "g", "m", "㎡", "L", "unit/s"],
      product: null,
      update: false,
      all_products: null,
      favourites: [],
      user: null,
      basket: [],
      orders_made: null,
      orders_sold: null,
      order: null,
    },
    actions: {
      // Use getActions to call a function within a function

      //LOGOUT
      logout: () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        console.log("Login out");
        setStore({
          token: null,
          data: null,
          message: null,
          product: null,
          update: false,
          favourites: [],
          basket: [],
          orders_made: null,
          orders_sold: null,
          order: null,
        });
      },
      //SYNCYNG TOKEN IN SESSION
      syncTokenFromSessionStore: () => {
        const store = getStore();
        const token = sessionStorage.getItem("token");
        if (token && !store.token) {
          console.log("syncTokenFromSessionStore");
          setStore({ token: token });
        }
      },
      //SIGN UP
      signup: async (username, email, company, phone, location, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            company: company,
            phone: phone,
            location: location,
            password: password,
          }),
        };
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/signup", opts);
          if (resp.status !== 200) {
            console.log("There has been some error", resp.status);
            const data = await resp.json();
            setStore({ message: data.msg });
            return false;
          }
          const data = await resp.json();
          setStore({ message: null });
          console.log("User created data response", data);
          return true;
        } catch (error) {
          console.error("There has been an error signing up:", resp.status);
        }
      },
      //LOGIN
      login: async (email, password) => {
        // 1. Fetch to generate token
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/token", opts);

          if (resp.status !== 200) {
            console.log("There has been some error generating token");
            const data = await resp.json();
            setStore({ message: data.msg });
            return false;
          }

          const data = await resp.json();
          // console.log("This came from the backend", data);

          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token, message: null });
        } catch (error) {
          console.error("There has been an error logging in:", error);
        }
      },
      //GET CURRENT USER DATA
      getCurrentUserData: async () => {
        // 2. Fetch to retrieve user data

        const store = getStore();
        const data_opts = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/user",
            data_opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error retrieving data");
            return false;
          }

          const user_data = await resp.json();
          // console.log("This is the user data", user_data);
          setStore({
            data: user_data,
            message: null,
            favourites: user_data.favourites,
            basket: user_data.basket,
          });
          // sessionStorage.setItem("user", user_data);
          return true;
        } catch (error) {
          console.error("There has been an error retrieving data:", error);
        }
      },
      //GET AN USER DATA
      getUserData: async (id) => {
        const data_opts = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/user/" + id,
            data_opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error retrieving data");
            return false;
          }

          const user_data = await resp.json();
          console.log("This is the user data", user_data);
          setStore({ user: user_data, message: null });
          return true;
        } catch (error) {
          console.error("There has been an error retrieving data:", error);
        }
      },
      //CLEAR USER DATA
      clearUserData: () => {
        setStore({ user: null });
      },
      //EDIT USER PROFILE
      editprofile: async (
        id,
        username,
        email,
        company,
        phone,
        location,
        password
      ) => {
        const store = getStore();

        const opts = {
          method: "PUT",
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            company: company,
            phone: phone,
            location: location,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/user/" + id,
            opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error updating the data");
            const msg = await resp.json();
            setStore({ message: msg.msg });
            return false;
          }

          const user_data = await resp.json();
          console.log("This is the user data", user_data);
          setStore({ data: user_data, message: null });
          return true;
        } catch (error) {
          console.error("There has been an error retrieving data:", error);
        }
      },
      // CLEAR MESSAGES
      clearmessage: () => {
        setStore({ message: null });
      },
      //DELETE USER PROFILE
      delete_profile: async (id) => {
        const store = getStore();

        const opts = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/user/" + id,
            opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error deleting the user");
            const msg = await resp.json();
            setStore({ message: msg.msg });
            return false;
          }

          const user_data = await resp.json();
          console.log("This is the user data", user_data);
          console.log("User deleted");
          setStore({ token: null, data: null, message: null });
          return true;
        } catch (error) {
          console.error("There has been an error deleting the user:", error);
        }
      },
      // CREATE NEW PRODUCT
      new_product: async (
        user_id,
        name,
        stock,
        type,
        price,
        unit,
        location,
        description
        // inputImage
      ) => {
        const store = getStore();
        // const prod_data = new FormData();
        // prod_data.append("pic", inputImage);
        // prod_data.append("picname", inputImage.name);
        // prod_data.append("user_id", user_id);
        // prod_data.append("name", name);
        // prod_data.append("stock", Number(stock));
        // prod_data.append("type", store.types[type]);
        // prod_data.append("price", Number(price));
        // prod_data.append("unit", store.units[unit]);
        // prod_data.append("location", location);
        // prod_data.append("description", description);

        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          // body: prod_data,
          body: JSON.stringify({
            user_id: user_id,
            name: name,
            stock: Number(stock),
            type: store.types[type],
            price: Number(price),
            unit: store.units[unit],
            location: location,
            description: description,
          }),
        };
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/product", opts);
          if (resp.status !== 200) {
            console.log(
              "There has been some error creating the product",
              resp.status
            );
            const data = await resp.json();
            setStore({ message: data.msg, product: null });
            return false;
          }
          const data = await resp.json();
          setStore({ message: null });
          console.log("Product created data:", data);
          setStore({ update: true });
          return true;
        } catch (error) {
          console.error(
            "There has been an error creating the product:",
            resp.status
          );
        }
      },
      //SET SINGLE PRODUCT
      setSingleProduct: (product) => {
        setStore({ product: product });
      },
      //GET PRODUCT DATA
      getProductData: async (id) => {
        const data_opts = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/product/" + id,
            data_opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error retrieving data");
            return false;
          }

          const product_data = await resp.json();
          console.log("This is the product data", product_data);
          setStore({ product: product_data });
          return true;
        } catch (error) {
          console.error("There has been an error retrieving data:", error);
        }
      },
      //CLEAR PRODUCT DATA
      clearProductData: () => {
        setStore({ product: null });
      },
      //GET ALL PRODUCTS
      getAllProducts: async (origin = undefined) => {
        let url;
        if (origin) {
          url = process.env.BACKEND_URL + "/products/" + origin;
        } else {
          url = process.env.BACKEND_URL + "/products";
        }
        try {
          const resp = await fetch(url);
          if (resp.status !== 200) {
            console.log(
              "There has been some error retrieving all products data"
            );
            return false;
          }

          const all_products = await resp.json();
          // console.log("These are all products data", all_products);
          setStore({ all_products: all_products });
          return true;
        } catch (error) {
          console.error(
            "There has been an error retrieving all products data:",
            error
          );
        }
      },
      //DELETE PRODUCT
      delete_product: async (id) => {
        const store = getStore();

        const opts = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/product/" + id,
            opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error deleting the product");
            const msg = await resp.json();
            setStore({ message: msg.msg });
            return false;
          }

          const user_data = await resp.json();
          console.log("This is the product data", user_data);
          console.log("Product deleted");
          setStore({ message: null, update: true });
          return true;
        } catch (error) {
          console.error("There has been an error deleting the product:", error);
        }
      },
      //SET NEW
      toggle_update: () => {
        const store = getStore();
        setStore({ update: !store.update });
      },
      //EDIT PRODUCT
      edit_product: async (
        id,
        user_id,
        name,
        stock,
        type,
        price,
        unit,
        location,
        description
      ) => {
        const store = getStore();

        const opts = {
          method: "PUT",
          body: JSON.stringify({
            user_id: user_id,
            name: name,
            stock: stock,
            type: type,
            price: price,
            unit: unit,
            location: location,
            description: description,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/product/" + id,
            opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error updating the product");
            const msg = await resp.json();
            setStore({ message: msg.msg, product: null });
            return false;
          }

          const product_data = await resp.json();
          console.log("This is the product data", product_data);
          return true;
        } catch (error) {
          console.error(
            "There has been an error retrieving product data:",
            error
          );
        }
      },
      //ADD FAVOURITE
      add_favourite: async (user_id, product_id) => {
        const store = getStore();

        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify({
            user_id: user_id,
            product_id: product_id,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/favourite",
            opts
          );
          if (resp.status !== 200) {
            console.log(
              "There has been some error adding the favourite",
              resp.status
            );
            const data = await resp.json();
            setStore({ message: data.msg });
            return false;
          }
          const favourites = await resp.json();
          const newFavourites = [...store.favourites, favourites];
          setStore({ favourites: newFavourites });
          console.log("new favourites:", store.favourites);
          return true;
        } catch (error) {
          console.error(
            "There has been an error adding the favourite:",
            resp.status
          );
        }
      },
      //DELETE FAVOURITE
      delete_favourite: async (id) => {
        const store = getStore();

        const opts = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/favourite/" + id,
            opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error deleting the favourite");
            return false;
          }

          const favourite = await resp.json();
          const newFavourites = store.favourites.filter((fav) => {
            return fav.id !== favourite.id;
          });
          console.log("Favourite deleted");
          setStore({ favourites: newFavourites });
          console.log("These are the remaining favourites", store.favourites);

          return true;
        } catch (error) {
          console.error(
            "There has been an error deleting the favourite:",
            error
          );
        }
      },
      //ADD BASKET ITEM
      add_to_basket: async (user_id, product_id, quantity = 1) => {
        const store = getStore();

        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify({
            user_id: user_id,
            product_id: product_id,
            quantity: quantity,
          }),
        };
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/basket", opts);
          if (resp.status !== 200) {
            console.log(
              "There has been some error adding the basket item",
              resp.status
            );
            const data = await resp.json();
            setStore({ message: data.msg });
            return false;
          }
          const basket_item = await resp.json();
          const newBasket = [...store.basket, basket_item];
          setStore({ basket: newBasket });
          console.log("new basket:", store.basket);
          return true;
        } catch (error) {
          console.error(
            "There has been an error adding the basket item:",
            resp.status
          );
        }
      },
      //DELETE BASKET ITEM
      delete_from_basket: async (id) => {
        const store = getStore();
        const actions = getActions();
        const opts = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/basket/" + id,
            opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error deleting the basket item");
            return false;
          }

          const basket_item = await resp.json();
          const newBasket = store.basket.filter((bi) => {
            return bi.id !== basket_item.id;
          });
          console.log("Basket item deleted");
          setStore({ basket: newBasket });
          if (store.basket.length === 0) {
            actions.clearProductData();
            actions.clearUserData();
          }
          console.log("This is the remaining basket", store.basket);

          return true;
        } catch (error) {
          console.error(
            "There has been an error deleting the basket item:",
            error
          );
        }
      },
      //UPDATE BASKET ITEM QUANTITY
      bi_quantity: async (id, quantity) => {
        const store = getStore();
        const opts = {
          method: "PUT",
          body: JSON.stringify({
            quantity: quantity,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/basket/" + id,
            opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error updating the quantity");

            return false;
          }

          const basket_item = await resp.json();
          console.log("This is the product data", basket_item);

          //Replace value of quantity inside the store.basket
          let basket = store.basket;

          //Find index of specific basket-item using findIndex method.
          const objIndex = basket.findIndex((obj) => obj.id == basket_item.id);

          //Update object's quantity property.
          basket[objIndex].quantity = basket_item.quantity;
          basket[objIndex].subtotal = +(
            Math.round(basket_item.subtotal * 100) / 100
          ).toFixed(2);

          setStore({ basket: basket });

          console.log("new basket:", store.basket);
          return true;
        } catch (error) {
          console.error(
            "There has been an error retrieving basket item data:",
            error
          );
        }
      },
      //CHECK BY-PRODUCT EXISTS IN THE BASKET BEFORE ADDING IT
      check_basket_add: (quantity) => {
        const actions = getActions();
        const store = getStore();

        const product = store.product;
        const basket_prods_ids = store.basket.map((item) => {
          return item.product.id;
        });
        if (basket_prods_ids.includes(product.id)) {
          const basket_item = store.basket.filter((bi) => {
            return bi.product.id === product.id;
          })[0];
          const id = basket_item.id;
          const total_qty = basket_item.quantity + quantity;
          actions.bi_quantity(id, total_qty);
        } else {
          actions.add_to_basket(store.data.id, product.id, quantity);
        }
        actions.clearmessage();
        return true;
      },
      //CHECK QUANTITY AND ADD
      check_qty: (quantity) => {
        if (quantity === 0) {
          setStore({ message: "Please select a quantity bigger than 0" });
        } else {
          return true;
        }
      },
      //CHECK BASKET PRODUCTS USER
      check_user: (user) => {
        const store = getStore();
        const actions = getActions();

        const basket_items_userid = store.basket.map((item) => {
          return item.product.user_id;
        })[0];

        console.log("store.user", store.user);

        if (user.id === store.data.id) {
          setStore({ message: "You can't add your own items to the basket" });
        } else if (
          store.basket.length !== 0 &&
          basket_items_userid !== user.id
        ) {
          setStore({
            message: "Basket can only contain items from the same user.",
          });
        } else {
          return true;
        }
      },
      //CREATE NEW ORDER
      create_order: async (delivery, total, user_id) => {
        const store = getStore();
        const actions = getActions();
        const items = store.basket;
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify({
            items: items,
            delivery: delivery,
            total: total,
            user_id: user_id,
          }),
        };
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/order", opts);
          if (resp.status !== 200) {
            console.log(
              "There has been some error creating the order",
              resp.status
            );
            const data = await resp.json();
            setStore({ message: data.msg });
            return false;
          }
          const order = await resp.json();
          console.log("new order:", order);
          console.log("store.basket", store.basket);
          for (const item in store.basket) {
            console.log("item:", store.basket[item]);
            actions.delete_from_basket(store.basket[item].id);
          }
          // setStore({ basket: null });
          return true;
        } catch (error) {
          console.error(
            "There has been an error creating the order:",
            resp.status
          );
        }
      },
      //GET ORDERS MADE BY THE USER
      getMadeOrders: async (id) => {
        const store = getStore();
        const data_opts = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/user_made_orders/" + id,
            data_opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error retrieving data");
            return false;
          }

          const orders_made = await resp.json();
          // console.log("This is the user data", user_data);
          setStore({
            orders_made: orders_made,
          });
          return true;
        } catch (error) {
          console.error("There has been an error retrieving data:", error);
        }
      },
      //GET ORDERS SOLD BY THE USER
      getSoldOrders: async (id) => {
        const store = getStore();
        const data_opts = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/user_sold_orders/" + id,
            data_opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error retrieving data");
            return false;
          }

          const orders_sold = await resp.json();
          // console.log("This is the user data", user_data);
          setStore({
            orders_sold: orders_sold,
          });
          return true;
        } catch (error) {
          console.error("There has been an error retrieving data:", error);
        }
      },
      //GET ONE ORDER DATA
      getOrderData: async (id) => {
        const store = getStore();

        const data_opts = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/order/" + id,
            data_opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error retrieving order data");
            return false;
          }

          const order = await resp.json();
          console.log("This is the order data", order);
          setStore({ order: order });
          return true;
        } catch (error) {
          console.error(
            "There has been an error retrieving order data:",
            error
          );
        }
      },
      //GET AN IMAGE
      getImage: async (id) => {
        // const store = getStore();

        const data_opts = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/image/" + id,
            data_opts
          );

          if (resp.status !== 200) {
            console.log("There has been some error retrieving image data");
            return false;
          }

          const image = await resp.json();
          console.log("This is the image data", image);
          // setStore({ order: order });
          return true;
        } catch (error) {
          console.error(
            "There has been an error retrieving image data:",
            error
          );
        }
      },
    },
  };
};

export default getState;

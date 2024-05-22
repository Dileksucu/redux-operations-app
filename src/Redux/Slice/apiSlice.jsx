import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../Service/UserService";

//ayrıştırıcı bir array tanımlamalıyım buraya, yoksa daha farklı servisler kullanıldığında karışılıklık oluşabilir.
const initialState = {
  data: [],
  getById:[],
  isLoading: false,
  error: "",
};

export const fetchData = createAsyncThunk("fetchData", async () => {
  const response = await UserService.getUserAll();
  return response?.data;
});

export const PostData = createAsyncThunk("PostData", async (request) => {
  const response = await UserService.UserPost(request)
  return response?.data;
});

export const DeleteData = createAsyncThunk("DeleteData", async (id) => {
  const response = await UserService.UserDelete(id);
  // console.log("response",response.data)
  return response?.data;
});

export const GetUserById=createAsyncThunk("GetUserById", async(id)=>{
  const response= await UserService.getUserById(id);
  return response?.data
});

export const UpdateUser=createAsyncThunk("UpdateUser",async(res)=>{
   const response=await UserService.UpdateUser(res)
   return response.data
});

const apiSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //GET
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
        //api load durumuda, beklemede
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        //api'den data geldi success durumu

        // state.data = state.data.concat(action.payload); --> burada veriyi concat ile tekrarlıyor
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Error data fetching";

        //api error verdi hata durumu
      });

    //POST
    builder
      .addCase(PostData.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(PostData.fulfilled, (state, action) => {
        // state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(PostData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Error data post";
      });

      //Get/id
      builder
      .addCase(GetUserById.pending,(state)=>{
        state.isLoading=true;
      })
      .addCase(GetUserById.fulfilled,(state,action)=>{
        state.getById=action.payload;
        // state.data=null;
        state.isLoading=false;
      })
      .addCase(GetUserById.rejected,(state)=>{
        state.isLoading=false;
        state.error="errors modal data"
      })


      //Delete
    builder
      .addCase(DeleteData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteData.fulfilled, (state, action) => {
        // state.data = action.payload;  --> dizinin içerisine delete apideki 200 statusu yazmaya çalışıyor ondan hata alıyorum
        state.isLoading = false;
      })
      .addCase(DeleteData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Error data delete";
      })

      //Update
      builder
      .addCase(UpdateUser.fulfilled,(state,action)=>{
         state.isLoading=false;
        //Burada herhangi bir initial içine parametre tanımlamaya gerek yok , çünkü veri tutulacak bir durum yok.
      })
      .addCase(UpdateUser.pending,(state)=>{
          state.isLoading=true;
      })
      .addCase(UpdateUser.rejected,(state)=>{
        state.isLoading=false;
        state.error = "Error data update";
      })
  },
});

export const apiActions = apiSlice.actions;
export default apiSlice.reducer;

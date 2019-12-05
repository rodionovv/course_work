#include <napi.h>
#include <iostream>

using namespace std;

Napi::Array SayHi(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    int n = 2;
    string arr_1[n] = {"Hello", " world!"};
    Napi::Array arr = Napi::Array::New(env, n);
    for (int i = 0; i < n; i++) {
        arr[i] = Napi::String::New(env, arr_1[i]);
    }
    return arr;
}

Napi::Object init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "sayHI"),
                 Napi::Function::New(env, SayHi));
    return exports;
}

NODE_API_MODULE(hello_world, init);



#include <napi.h>
#include <iostream>
#include <fstream>
#include <sstream>
#include <utility>
#include <map>
#include <vector>

using namespace std;


Napi::Object SayHi(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    string path = info[0].As<Napi::String>();
    ifstream infile(path);
    string line;
    map<int, vector<int>> graph;
    while (getline(infile, line)) {
        istringstream iss(line);
        int arr[2], i = 0;
        string num;
        while (getline(iss, num, '\t')){
            if (num[0] != '#' && num[0] != 'T'){
                arr[i] = stoi(num);
                i++;
            }
        }
        
        if (graph.find(arr[0]) == graph.end()){
            vector<int> vec = { arr[1] }; 
            graph.insert(pair<int, vector<int>>( arr[0], vec ));
        } else {
            graph[arr[0]].push_back(arr[1]);
        }
    }
    Napi::Object obj = Napi::Object::New(env);
    string str = "left";
    for (auto const& it : graph) {
        Napi::Array arr = Napi::Array::New(env, it.second.size());
        for (int i = 0; i < it.second.size(); i++) {
            Napi::Number val = Napi::Number::New(env, it.second[i]);
            arr[i] = val;
        }
        obj.Set(str, arr);
        str = "right";
    }
    return obj;
}

Napi::Object init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "sayHI"),
                 Napi::Function::New(env, SayHi));
    return exports;
}

NODE_API_MODULE(hello_world, init);



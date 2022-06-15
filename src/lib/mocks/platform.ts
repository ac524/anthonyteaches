let mockPlatform : App.Platform;

const createKVMock = (defaultData : [string, string][] = []) => {
    const store = new Map<string,string>(defaultData);
    return {
        async get(key:string) {
            return store.get(key);
        },
        async put(key:string, value:string) {
            store.set(key, value);
           return [1, null];
        }
    }
}

export const createPlatformMock = () => {
    !mockPlatform && (mockPlatform = {
        env: {
            FILES: createKVMock(),
            CONTACTS: createKVMock()
        },
        context: {}
    });

    return mockPlatform;
}
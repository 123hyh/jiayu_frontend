export declare function useScmComponent(options: {
    size: 'medium' | 'small' | 'mini';
    dictRequest: (dictKeyword: string) => Promise<any> | any[];
}): {
    install: (_Vue: any) => void;
};
export declare function getSize(): string;
export declare function getCodeDict(keyword: string): any[] | Promise<any>;

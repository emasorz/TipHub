export class Option{

    private title:string;
    private options:string[];

    public getTitle(){
        return this.title;
    }

    public setTitle(title){
        this.title = title;
    }

    public getOptions(){
        return this.options;
    }

    constructor(title:string, options:string[]){
        this.title = title;
        this.options = options;
    }

    addOption(option:string){
        if(!this.options.includes(option))
            this.options.push(option);
    }

    removeOption(option:string){
        if(this.options.includes(option)){
            this.options.splice(this.options.indexOf(option),1);
        }
    }
}
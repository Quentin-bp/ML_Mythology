import clientHelper from "./ClientService"
export default class IAService {

    static getMainTypes(){
        return  clientHelper.get("main_types") 
    }

    static predict(data){
        return  clientHelper.post("predict",data) 
    }
    static predictIa(data){
        return  clientHelper.post("predict_ia",data) 
    }

    static searchBooks(params){
        return clientHelper.get("search/"+ params.content +"&maxResults=5&orderBy=newest&printType=books&langRestrict=" + params.langage)
    }

    static handleError(error){
        console.error(error);
    }
}
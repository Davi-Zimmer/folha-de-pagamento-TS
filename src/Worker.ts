import { randomUUID } from "crypto"

export interface WorkerProps {
    name: string
    role: string
    hourlyRate: number
    hours: number[]
}

export class Worker {
    private id: string
    private name: string
    private role: string
    private hourlyRate: number
    private hours: number[]

    constructor( {name, role, hourlyRate,  hours} : WorkerProps ){
        
        this.id = randomUUID().substring(0, 5)
        this.name = name
        this.role = role
        this.hourlyRate = hourlyRate
        this.hours = hours

    }

    getId(){
        return this.id
    }

    addHours( workedHours: number ){
        this.hours.push( workedHours )
    }

    getHourlyRate() : number{
        return this.hourlyRate
    }

    getHours() : number[]{
        return this.hours
    }

    getName() : string{
        return this.name
    }

    getRole() : string{
        return this.role
    }

    registerHours( workedHours:number ):void {
        this.hours.push( workedHours )
    }

    calculateMonthlySalary( ): number{
   
        const salary = this.hourlyRate * this.hours.reduce( (lot, value) => lot + value, 0 )
    
        return salary
    }


    
    calculeINSS(){
    
    function range( current:number, less:number, greater:number ){
        return current > less && current > greater
    }

        const salary = this.calculateMonthlySalary()

        let inss = 0

        if( salary < 1412 )                   inss = salary * .075; else 
        if( range(salary, 1412.01, 2666.68) ) inss = salary * .09; else 
        if( range(salary, 2666.69, 4000.03) ) inss = salary * .12; else 
        if( salary > 4000.04 )                inss = salary * .14

        inss = Math.min(908.85, inss)

        return inss
    }


}
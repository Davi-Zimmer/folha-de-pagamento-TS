import { Worker, WorkerProps } from "./Worker"
import PromptSync from "prompt-sync"
const prompt = PromptSync()

export abstract class WorkerManager{

    static workers:Worker[] = []

    static createWorker( name:string, role:string, hourlyRate:number ){
        return new Worker( { name, role, hourlyRate, hours:[] } )
    }

    static addWorker( worker:Worker ) {
        this.workers.push( worker )
    }

    static getWorkerById( id: string ) {
        return this.workers.find( worker => worker.getId() == id)
    }

    static registerHours( id:string, workedHours:number ):void {
        const worker = this.getWorkerById( id )
        
        worker?.registerHours( workedHours )
    }

    static calculateMonthlySalary( worker:Worker ): number{
        
        return worker.calculateMonthlySalary()
        
    }

    static geratePaymentReport( worker:Worker ){
        const [name, role, hours] = [ worker.getName(), worker.getRole(), worker.getHours() ]
    
        const totalHours = hours.reduce((lot, val) => lot + val, 0)
    
        const inss = worker.calculeINSS()
    
        const salary = worker.calculateMonthlySalary()
    
        const salaryLiquid = salary - inss
    
        const a = `
            Nome: ${name}
            Cargo: ${role}
            Total de horas: ${totalHours}
            Valor do INSS: ${inss}
            Salário bruto: ${ salary.toFixed(2) }
            Salário Líquido: ${ salaryLiquid }
        `
    
        console.log( a )
    }

    static handlePaymentReport() {

        let n;
        
        do {
            console.log('----------------------------------------------------------------------')
       
            console.log('1 Adicionar funcionario')
            console.log('2 Registrar horas trabalhadas')
            console.log('3 Exibir relatório de pagamento')
            console.log('4 Listar funcionários')
            console.log('5 Sair')
    
            n = prompt("Digite a opção desejada: ");
    
            switch( n ){
                case '1' :
                    {
                        let name = prompt('Digite o nome do usuário: ')
                        let role = prompt('Digite o cargo do usuário: ')
                        let hourlyRate = prompt('Digite a carga horária do usuário: ')
    
                        if( !name || !role || !hourlyRate ){
                            console.log('Preencha todos os campos.')
                            return
                        }

                        const worker = this.createWorker( name, role, +hourlyRate )

                        this.addWorker( worker )
                    }
                break;
    
                case '2' :
                    {
                        let id = prompt('Digite o id do usuário: ')
                        let hours = prompt('Digite a quantia de horas: ')
                        
                        if( !id || !hours ){
                            console.log('Preencha todos os campos.')
                            return
                        }

                        this.registerHours( id, +hours )
                    }
    
                break;
    
                case '3' :
                    let id = prompt('Digite o id do usuário :')

                    if( !id ){
                        console.log('Preencha o campo.')
                        return
                    }

                    const worker = this.getWorkerById( id )
                    if( worker ){

                        this.geratePaymentReport( worker )
                    } else {
                        console.log("usuário não encontrado.")
                    }
    
                break;

                case '4' : {
                    this.workersList()
                    break;
                }
                
            }
    
        } while ( n != '5' )
    
    }
    
    static workersList(){
        console.log( ...this.workers )
    }

}

const worker = WorkerManager.createWorker("Wall Termite", "Teacher", 5)

WorkerManager.addWorker( worker )

const firstWorker = WorkerManager.workers[ 0 ]

const id = firstWorker.getId()

WorkerManager.registerHours( id, 50 )

WorkerManager.handlePaymentReport()
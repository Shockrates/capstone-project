import counter from "../models/counter"
import {ICounter} from "../types/counter"

// const getNextSequenceValue = (sequenceName: string) : number => {
//    const sequenceDocument: ICounter = counter.findByIdAndUpdate({
//       query:{_id: sequenceName },
//       update: {$inc:{sequence_value:1}},
//       new:true
//    });
//    return sequenceDocument.sequence_value;
// }


const getNextSequenceValue = (sequenceName: string) : number => {
   var ids :number 
   counter
   .findByIdAndUpdate({
      query:{_id: sequenceName },
      update: {$inc:{sequence_value:1}},
      new:true
   })
   .then((id) => {
      if (id) 
      ids = id.sequence_value
    })
    .catch((err: Error) => {
      
    });
    return ids
}

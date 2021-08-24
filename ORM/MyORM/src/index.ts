import "reflect-metadata";
import { createConnection, getManager } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { ActionType } from "./entity/ActionTypes";
import { SolutionsLog } from "./entity/SolutionsLog";
/**
 * ORM TYPEORM
 */
createConnection()
  .then(async (connection) => {
    /**
     *
     * 1. Como implementar un objeto que representa una relacion 1 a N
     *
     * Para la implementación de un objeto que representa una relación 1 a n, utilicé
     * la base de datos dada por el profesor, "solutiondesigns", donde usé las tablas "sd_solutionlogs" y
     * "sd_actiontypes", donde se puede verificar esta relación. 1 action type posee n solution logs.
     * En las clases entidades SolutionsLog y ActionType se puede ver cómo se realizó la implementación.
     * Donde se hizo uso de las anotaciones OneToMany y ManyToOne, donde la entidad SolutionLogs posee
     * la anotación ManyToOne y ActionType posee OneToMany.
     *
     * Además, a continuación se puede ver dónde se hace un SELECT* de las dos tablas.
     *
     */
    const tiposRepo = connection.getRepository(ActionType);
    const tipos = await tiposRepo.findOne({ relations: ["solutionlogs"] });
    console.log(tipos);

    const logsRepo = connection.getRepository(SolutionsLog);
    const logs = await logsRepo.find({ relations: ["actionType", "solution"] });
    console.log(logs);

    /**
     * 2. Como manipular object pooling para reducir la cantidad de conexiones
     * Este tipo de ORM siempre crea un conection pool "out of the box". No hay necesidad de configurar nada.
     * Aún así, da la opción de configurar la cantidad de conexiones máximas y mínimas permitidas, las cuales,
     * se pueden visualizar en el archivo "ormconfig.json", donde, en el apartado de pool, se realizó la configuarción
     * máxima de 10 conexiones, la cual es la que viene por default en el ORM.
     * Por lo tanto, para realizar una conexión, sólo es necesaria esta función "createConnection", en la cual se
     * pueden realizar las consultas que sean necesarias sin necesidad de estar instanciando una nueva conexión.
     */

    /**
     * 3. Como implementar una transacción que afecte a más de una tabla
     * Primero, se realiza un select de todos los solutionslog que fueron comentados.
     * Segundo, se procede a crear el nuevo ActionType y al mismo tiempo se realiza el Update de todos los
     * solutionLogs y pasan de ser comment a ser Edited.
     */

    await getManager().transaction(async (transactionalEntityManager) => {
      // Select all solutions commented
      const commentedSolutionLogs = await transactionalEntityManager
        .getRepository(SolutionsLog)
        .createQueryBuilder("solutionlog")
        .innerJoin("solutionlog.actionType", "actionType")
        .where("actionType.name = :name", { name: "comment" })
        .getMany();

      // Create new ActionType
      const newActionType = new ActionType();
      newActionType.name = "Edited";
      newActionType.iconurl = "http://www.losiconos.com/edited.png";
      newActionType.solutionlogs = commentedSolutionLogs;
      await transactionalEntityManager.save(newActionType); // update incluido de los solutionLogs

      // Select all solutions commented
      const editedSolutionLogs = await transactionalEntityManager
        .getRepository(SolutionsLog)
        .createQueryBuilder("solutionlog")
        .innerJoin("solutionlog.actionType", "actionType")
        .where("actionType.name = :name", { name: "Edited" })
        .getMany();
      console.log(editedSolutionLogs);
    });
  })
  .catch((error) => console.log(error));

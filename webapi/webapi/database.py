from playhouse.pool import PooledPostgresqlExtDatabase

from webapi.config import config


database = PooledPostgresqlExtDatabase(None, autocommit=False, register_hstore=False)


def init_database(db_name='app'):
    ''' Initialise a connection to the given database (app by default).

    Inputs:
        db_name (str): name of the database, should match a database specified in config
    Output:
        A PooledPostgresqlExtDatabase object
    '''
    db_config = config['database'][db_name]
    database.init(database=db_config['name'], **db_config['conn'])
    return database
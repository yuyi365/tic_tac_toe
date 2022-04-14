from sqlalchemy import create_engine


engine = create_engine()

with engine.connect() as conn:
    results = conn.execute("SELECT * from games")
    results.fetchall()
    
    add_game = conn.insert.values({
        id, pin, winning_player,created_at
    })

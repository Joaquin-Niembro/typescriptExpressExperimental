import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators/';
function Auth(req: Request, res: Response, next: NextFunction): void {
	if (req.session && req.session.loggedIn) {
		next();
		return;
	} else {
		res.send('You are not logged in');
	}
}
@controller('')
class RootController {
	@get('/root')
	getRoot(req: Request, res: Response): Response {
		if (req.session && req.session.loggedIn) {
			return res.send(`
            <div>
                <h1>You are logged in</h1>
                <a href='/auth/logout'>logout</a>
            </div>
            `);
		} else {
			return res.send(`
            <div>
                <h1>You are NOT logged in</h1>
                <a href='/auth/login'>login</a>
            </div>
            `);
		}
	}
	@get('/protected')
	@use(Auth)
	getProtected(req: Request, res: Response): Response {
		return res.send('welcome from protected');
	}
}

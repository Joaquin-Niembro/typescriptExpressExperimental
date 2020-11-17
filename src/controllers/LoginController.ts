import { Request, Response } from 'express';
import { get, controller, bodyValidator, post } from './decorators/';
/*interface RequestWithBody extends Request {
	body: { [key: string]: string | undefined };
}*/
@controller('/auth')
class LoginController {
    
	@get('/login')
	getLogin(req: Request, res: Response): void {
		res.send(`
        <form method='POST'>
            <div>
                <label>email</label>
                <input name='email' />
            </div>
            <div>
                <label>password</label>
                <input name='password' type='password'/>
            </div>
            <button type='submit'>submit</button>
        </form>    
        `);
	}
	@post('/login')
	@bodyValidator('email', 'password')
	postLogin(req: Request, res: Response) {
		const { email, password } = req.body;

		if (email === '1@gmail.com' && password === '1') {
			req.session = { loggedIn: true };
			res.redirect('/');
		} else {
			return res.send('invalid email or password');
		}
    }
    @get('/logout')
    getLogout(req:Request, res: Response){
        req.session = null
        res.redirect('/')
    }
}

> Repo applying TDD, DDD, Clean Architecture, Design Patterns and SOLID using Node
___
## 🛠 Tools used

- Node
- Jest
- Supertest
- Typescript
- Express

___

# Annotations

## Clean architecture

- Uncouple layers implementations.
- Adapters to implement a feature that will be uncoupled from the method/library/framework.
- **Presentation** layer to create Controllers to return something to the user.
- **Domain** layer to create interfaces from business rules to being implemented.
- **Data** layer to implement the Domain interfaces to implement the adapters.
- **Infra** layer to implement interfaces for libraries/frameworks.

## Tests

- [Test Doubles](https://martinfowler.com/bliki/TestDouble.html).
- **TDD**: Make the test before the implementation itself, considering the business rules.

## SOLID

- **SRP**: Classes, helpers, etc doing just one thing
- **ISP**: Interfaces doing just one thing


## Criptography

- **Hasher**: Irreversible
- **KDF** (salt): generate a new hash to be safer, the trade-off is the decreased velocity generating the hashed password

## Design patterns

- Proxy: a filter that intercepts a request and verifies if the condition is valid. Example: Middlewares
- Factory: a method that builds something. Example: sut creators


## Git alias

```bash
git config --global --edit
```

```bash
[user]
	email = rodrigovictor81@gmail.com
	name = rodrigorvsn
[push]
	default = current
	autoSetupRemote = true
[credential]
	helper = manager-core
[push]
  followTags = true
[core]
  editor = nvim
[alias]
  s = !git status -s  
  c = !git add --all && git commit -m
  l = !git log --pretty=format:'%C(blue)%h %C(red)%d%C(white)%s - %C(green)%cn, %cr'
```

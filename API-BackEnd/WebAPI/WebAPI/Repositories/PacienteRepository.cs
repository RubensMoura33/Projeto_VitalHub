﻿using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Utils;
using WebAPI.ViewModels;

namespace WebAPI.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        VitalContext ctx = new VitalContext();

        public Paciente AtualizarPerfil(Guid Id, PacienteViewModel paciente)
        {
            //foto
            //data nascimento
            //cpf
            //endereco logradouro numero cep

            Paciente pacienteBuscado = ctx.Pacientes.Include(x => x.Endereco).FirstOrDefault(x => x.Id == Id)!;

            if (paciente.Foto != null)
                pacienteBuscado!.IdNavigation.Foto = paciente.Foto;

            if (paciente.DataNascimento != null)
                pacienteBuscado!.DataNascimento = paciente.DataNascimento;

            if (paciente.Cpf != null)
                pacienteBuscado!.Cpf = paciente.Cpf;

            if (paciente.Logradouro != null)
                pacienteBuscado!.Endereco!.Logradouro = paciente.Logradouro;

            if (paciente.Numero != null)
                pacienteBuscado!.Endereco!.Numero = paciente.Numero;

            if(paciente.Cidade != null)
                pacienteBuscado.Endereco.Cidade = paciente.Cidade;

            if (paciente.Cep != null)
                pacienteBuscado!.Endereco!.Cep = paciente.Cep;

            ctx.Pacientes.Update(pacienteBuscado!);
            ctx.SaveChanges();

            return pacienteBuscado!;
        }

        public List<Consulta> BuscarAgendadas(Guid Id)
        {
            return ctx.Consultas.Include(x => x.Situacao).Where(x => x.PacienteId == Id && x.Situacao.Situacao == "Pendentes").ToList();
        }

        public List<Consulta> BuscarCanceladas(Guid Id)
        {
            return ctx.Consultas.Include(x => x.Situacao).Where(x => x.PacienteId == Id && x.Situacao.Situacao == "Cancelados").ToList();
        }

        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid idPaciente)
        {
           return ctx.Consultas
                .Include(x => x.Situacao)
                .Include(x => x.Paciente)
                .Include(x => x.Paciente.IdNavigation)
                .Include(x => x.MedicoClinica.Medico)
                .Include(x => x.MedicoClinica.Medico.IdNavigation)
                .Include(x => x.Prioridade)
                .Include(x => x.MedicoClinica.Medico.Especialidade)
                .Where(x => x.PacienteId == idPaciente && EF.Functions.DateDiffDay(x.DataConsulta, dataConsulta) == 0)
                .ToList();
        }

        public Paciente BuscarPorId(Guid Id)
        {
            return ctx.Pacientes
                .Include(x => x.IdNavigation)
                .Include(x => x.Endereco)
                .FirstOrDefault(x => x.Id == Id)!;
        }

        public List<Consulta> BuscarRealizadas(Guid Id)
        {
            return ctx.Consultas.Include(x => x.Situacao).Where(x => x.PacienteId == Id && x.Situacao.Situacao == "Cancel").ToList();
        }

        public void Cadastrar(Usuario user)
        {
            user.Senha = Criptografia.GerarHash(user.Senha!);
            ctx.Usuarios.Add(user);
            ctx.SaveChanges();
        }
    }
}

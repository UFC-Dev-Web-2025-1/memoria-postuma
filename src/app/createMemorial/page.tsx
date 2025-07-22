'use client'
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Divider, TextField, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import React, { ReactNode } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

interface LabelFormProps {
  label: string
}

const LabelForm: React.FC<LabelFormProps> = ({ label }) => {
  return (
    <Divider sx={{ paddingY: 2 }}>
      <Typography variant="subtitle2">
        {label}
      </Typography>
    </Divider>
  )
}

interface DivInputsProps {
  children: ReactNode
}

const DivInputs: React.FC<DivInputsProps> = ({ children }) => {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      paddingBlock: 3
    }}>
      {children}
    </div>
  )
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function CreateMemorial() {
  return (
    <Box bgcolor='#FDFAF6' sx={{ paddingTop: 12, minHeight: '100vh', maxHeight: '100%' }}>
      <Navbar paginaAtual="Criar memorial" />

      <Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h4">
          Criar um novo memorial
        </Typography>

        <Typography variant="body1" textAlign={'center'}>
          Preencha os campos para criar um memorial personalizado.
          Adicione fotos, datas marcantes e uma biografia que compartilhe momentos especiais dessa vida.
          Você poderá atualizar as informações sempre que quiser.
        </Typography>
        
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
          noValidate
          autoComplete="off"
        >
          <LabelForm label="Dados pessoais" />
          <DivInputs>
            <TextField label="Nome do ente querido" id="outlined-size-normal" color="primary" focused />
            <TextField label="Cidade" id="outlined-size-normal" color="primary" focused />
          </DivInputs>
          <DivInputs>
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Foto de perfil
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
            </Button>

            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Foto de capa
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
            </Button>
          </DivInputs>

          <LabelForm label="Vida" />
          <DivInputs>
            <TextField label="Data de nascimento" id="outlined-size-normal" color="primary" focused type='date' />
            <TextField label="Data de falecimento" id="outlined-size-normal" color="primary" focused type='date' />
          </DivInputs>
          <DivInputs>
            <TextField
              label="História"
              multiline
              rows={4}
              focused
            />
          </DivInputs>

          <DivInputs>
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Imagens
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
            </Button>

            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Vídeos
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
              />
            </Button>
          </DivInputs>

          <LabelForm label="Dados do responsável" />
          <DivInputs>
            <TextField label="Nome do responsável" id="outlined-size-normal" color="primary" focused />
            <TextField label="Contato do responsável" id="outlined-size-normal" color="primary" focused />
          </DivInputs>
          <DivInputs>
            <TextField label="E-mail" id="outlined-size-normal" color="primary" focused type='email' />
            <TextField label="Confirme o e-mail" id="outlined-size-normal" color="primary" focused type='email' />
          </DivInputs>

          <DivInputs>
            <Link href={"/explore"}>
              <Button variant='contained' color='secondary' sx={{ color: 'white' }} startIcon={ <AddIcon /> }>Criar</Button>
            </Link>
          </DivInputs>

        </Box>
      </Container>

    </Box>
  )
}
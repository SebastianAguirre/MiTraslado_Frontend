export interface UsuarioInfo {
    usuario_tipoDocumento?: string;
    usuario_documento?: string;
    usuario_nombre: string;
    usuario_apellido: string;
    usuario_celular?: number;
    usuario_email: string;
    usuario_password: string;
    usuario_terminos: boolean;
}

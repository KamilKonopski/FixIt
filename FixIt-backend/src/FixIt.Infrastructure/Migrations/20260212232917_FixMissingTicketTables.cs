using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FixIt.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixMissingTicketTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TicketHistoryLog_Tickets_TicketId",
                table: "TicketHistoryLog");

            migrationBuilder.DropForeignKey(
                name: "FK_TicketHistoryLog_Users_ChangedByUserId",
                table: "TicketHistoryLog");

            migrationBuilder.DropForeignKey(
                name: "FK_TicketNote_Tickets_TicketId",
                table: "TicketNote");

            migrationBuilder.DropForeignKey(
                name: "FK_TicketNote_Users_AuthorId",
                table: "TicketNote");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TicketNote",
                table: "TicketNote");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TicketHistoryLog",
                table: "TicketHistoryLog");

            migrationBuilder.RenameTable(
                name: "TicketNote",
                newName: "TicketNotes");

            migrationBuilder.RenameTable(
                name: "TicketHistoryLog",
                newName: "TicketHistoryLogs");

            migrationBuilder.RenameIndex(
                name: "IX_TicketNote_TicketId",
                table: "TicketNotes",
                newName: "IX_TicketNotes_TicketId");

            migrationBuilder.RenameIndex(
                name: "IX_TicketNote_AuthorId",
                table: "TicketNotes",
                newName: "IX_TicketNotes_AuthorId");

            migrationBuilder.RenameIndex(
                name: "IX_TicketHistoryLog_TicketId",
                table: "TicketHistoryLogs",
                newName: "IX_TicketHistoryLogs_TicketId");

            migrationBuilder.RenameIndex(
                name: "IX_TicketHistoryLog_ChangedByUserId",
                table: "TicketHistoryLogs",
                newName: "IX_TicketHistoryLogs_ChangedByUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TicketNotes",
                table: "TicketNotes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TicketHistoryLogs",
                table: "TicketHistoryLogs",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TicketHistoryLogs_Tickets_TicketId",
                table: "TicketHistoryLogs",
                column: "TicketId",
                principalTable: "Tickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TicketHistoryLogs_Users_ChangedByUserId",
                table: "TicketHistoryLogs",
                column: "ChangedByUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TicketNotes_Tickets_TicketId",
                table: "TicketNotes",
                column: "TicketId",
                principalTable: "Tickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TicketNotes_Users_AuthorId",
                table: "TicketNotes",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TicketHistoryLogs_Tickets_TicketId",
                table: "TicketHistoryLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_TicketHistoryLogs_Users_ChangedByUserId",
                table: "TicketHistoryLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_TicketNotes_Tickets_TicketId",
                table: "TicketNotes");

            migrationBuilder.DropForeignKey(
                name: "FK_TicketNotes_Users_AuthorId",
                table: "TicketNotes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TicketNotes",
                table: "TicketNotes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TicketHistoryLogs",
                table: "TicketHistoryLogs");

            migrationBuilder.RenameTable(
                name: "TicketNotes",
                newName: "TicketNote");

            migrationBuilder.RenameTable(
                name: "TicketHistoryLogs",
                newName: "TicketHistoryLog");

            migrationBuilder.RenameIndex(
                name: "IX_TicketNotes_TicketId",
                table: "TicketNote",
                newName: "IX_TicketNote_TicketId");

            migrationBuilder.RenameIndex(
                name: "IX_TicketNotes_AuthorId",
                table: "TicketNote",
                newName: "IX_TicketNote_AuthorId");

            migrationBuilder.RenameIndex(
                name: "IX_TicketHistoryLogs_TicketId",
                table: "TicketHistoryLog",
                newName: "IX_TicketHistoryLog_TicketId");

            migrationBuilder.RenameIndex(
                name: "IX_TicketHistoryLogs_ChangedByUserId",
                table: "TicketHistoryLog",
                newName: "IX_TicketHistoryLog_ChangedByUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TicketNote",
                table: "TicketNote",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TicketHistoryLog",
                table: "TicketHistoryLog",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TicketHistoryLog_Tickets_TicketId",
                table: "TicketHistoryLog",
                column: "TicketId",
                principalTable: "Tickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TicketHistoryLog_Users_ChangedByUserId",
                table: "TicketHistoryLog",
                column: "ChangedByUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TicketNote_Tickets_TicketId",
                table: "TicketNote",
                column: "TicketId",
                principalTable: "Tickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TicketNote_Users_AuthorId",
                table: "TicketNote",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
